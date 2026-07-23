import {
  getStrapiField,
  getStrapiMedia,
  getStrapiMediaItems,
  StrapiEntity,
} from "@/lib/strapi";

export function strapiRichTextToString(value: any): string {
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return "";

  return value
    .map((block) => {
      if (typeof block === "string") return block;
      if (Array.isArray(block.children)) {
        return block.children.map((child: any) => child.text || "").join("");
      }
      return "";
    })
    .filter(Boolean)
    .join("\n");
}

export function strapiMedia(value: any, id: string, relation: "product" | "recipe" | "story"): any[] {
  return getStrapiMediaItems(value).flatMap((item, index) => {
    const url = getStrapiMedia(item.url);
    if (!url) return [];

    return [{
      media: { url, media_type: "IMAGE" as const },
      mediaId: `strapi-${relation}-media-${id}-${index}`,
      [`${relation}Id`]: `strapi-${id}`,
    }];
  });
}

export function mapStrapiDifficulty(value: string | null): "EASY" | "INTERMEDIARY" | "HARD" {
  switch (value?.toLowerCase()) {
    case "intermediaria":
    case "intermediary":
      return "INTERMEDIARY";
    case "dificil":
    case "hard":
      return "HARD";
    default:
      return "EASY";
  }
}

export function mapStrapiRegion(value: any) {
  if (!value) return { id: "", name: "" };
  if (typeof value === "string") return { id: value, name: value };
  return {
    id: String(value.id ?? value.documentId ?? value.name ?? ""),
    name: value.name ?? value.nome ?? "",
  };
}

export function strapiEntityId(item: StrapiEntity) {
  return String(item.documentId || item.id);
}

export { getStrapiField };
