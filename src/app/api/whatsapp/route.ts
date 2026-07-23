import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSingle, getStrapiField } from "@/lib/strapi";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get("product");
  const profileId = searchParams.get("profile");

  if (!productId && !profileId) {
    return NextResponse.json(
      { error: "Product ID or Profile ID is required" },
      { status: 400 }
    );
  }

  try {
    let phoneNumber: string | null = null;
    let productName = "";

    // Se veio productId, busca pelo produto
    if (productId) {
      if (productId.startsWith("strapi-")) {
        const documentId = productId.slice("strapi-".length);
        const strapiProduct = await getSingle("produtos", documentId, { populate: "*" });
        const phone = getStrapiField<string>(strapiProduct, "telefone", "Telefone");
        const name = getStrapiField<string>(strapiProduct, "Nome", "nome");

        if (!strapiProduct || !phone) {
          return NextResponse.json({ error: "Phone number not found" }, { status: 404 });
        }

        phoneNumber = phone;
        productName = name || "";
      } else {
      const product = await prisma.product.findUnique({
        where: { id: productId },
        select: {
          product_name: true,
          profile: {
            select: {
              phone_number: true,
            },
          },
        },
      });

      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }

      phoneNumber = product.profile.phone_number;
      productName = product.product_name;
      }
    }
    // Se veio profileId, busca pelo perfil
    else if (profileId) {
      const profile = await prisma.profile.findUnique({
        where: { id: profileId },
        select: {
          phone_number: true,
        },
      });

      if (!profile) {
        return NextResponse.json(
          { error: "Profile not found" },
          { status: 404 }
        );
      }

      phoneNumber = profile.phone_number;
    }

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number not found" },
        { status: 404 }
      );
    }

    // Monta a mensagem do WhatsApp
    const message = productName
      ? `Olá! Estou interessado(a) no produto: ${productName}`
      : "Olá! Gostaria de saber mais sobre seus produtos.";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Redireciona para o WhatsApp
    return NextResponse.redirect(whatsappUrl);
  } catch (error) {
    console.error("Error redirecting to WhatsApp:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
