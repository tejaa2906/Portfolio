import { resolveTravelAssetUrl } from "./travelMedia";

function splitParagraphs(text) {
  return String(text || "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function parseTravelStoryBlocks(text) {
  return splitParagraphs(text)
    .map((block) => {
      if (/^\[photo\d+\]$/i.test(block)) {
        return null;
      }

      const imageMatch = block.match(/^\[image:([^\]]+)\]$/i);

      if (imageMatch) {
        const [src = "", caption = "", variant = ""] = imageMatch[1]
          .split("|")
          .map((part) => part.trim());

        return {
          type: "image",
          src: resolveTravelAssetUrl(src),
          caption,
          variant
        };
      }

      if (block.startsWith("## ")) {
        return { type: "heading", content: block.slice(3).trim() };
      }

      if (block.startsWith("📸")) {
        return { type: "note", content: block.replace(/^📸\s*/, "").trim() };
      }

      return { type: "paragraph", content: block };
    })
    .filter(Boolean);
}
