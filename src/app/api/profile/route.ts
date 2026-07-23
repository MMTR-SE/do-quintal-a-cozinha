/**
 * Creates producer profiles with duplicate prevention.
 * Phone number is unique identifier (used for WhatsApp integration).
 */

import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.phone_number) {
    return new Response(JSON.stringify({ error: "Phone number is required" }), {
      status: 400,
    });
  }

  const profile = await prisma.profile.findUnique({
    where: { phone_number: body.phone_number },
  });

  if (profile) {
    return new Response(JSON.stringify({ error: "Profile already exists" }), {
      status: 400,
    });
  }

  if (!body.name) {
    return new Response(JSON.stringify({ error: "Name is required" }), {
      status: 400,
    });
  }

  try {
    const profile = await prisma.profile.create({
      data: {
        id: uuidv4(),
        name: body.name,
        phone_number: body.phone_number,
        social_name: body.social_name || null,
        instagram: body.instagram || null,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Profile created successfully",
        data: profile,
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating profile:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        stack: JSON.stringify(error),
      }),
      {
        status: 500,
      }
    );
  }
}

