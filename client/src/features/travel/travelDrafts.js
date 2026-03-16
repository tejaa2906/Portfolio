export const travelGallerySlots = 4;

export function makeEmptyTravelDraft() {
  return {
    id: "",
    title: "",
    slug: "",
    city: "",
    dateLabel: "",
    summary: "",
    body: "",
    displayOrder: 0,
    gallery: Array.from({ length: travelGallerySlots }, () => null)
  };
}

export function toTravelDraft(post) {
  if (!post) {
    return makeEmptyTravelDraft();
  }

  const gallery = Array.from({ length: travelGallerySlots }, () => null);

  (post.gallery || []).forEach((item, index) => {
    const slot = Number.isInteger(item.slot) ? item.slot : index;

    if (slot >= 0 && slot < travelGallerySlots) {
      gallery[slot] = {
        url: item.url,
        path: item.path || "",
        alt: item.alt || ""
      };
    }
  });

  return {
    id: post.id || "",
    title: post.title || "",
    slug: post.slug || "",
    city: post.city || "",
    dateLabel: post.dateLabel || "",
    summary: post.summary || "",
    body: post.body || "",
    displayOrder: post.displayOrder || 0,
    gallery
  };
}
