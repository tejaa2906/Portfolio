const absoluteUrlPattern = /^(?:[a-z]+:)?\/\//i;

function isExternalOrSpecialUrl(value) {
  return (
    absoluteUrlPattern.test(value) ||
    value.startsWith("data:") ||
    value.startsWith("blob:")
  );
}

export function resolveTravelAssetUrl(value) {
  const source = String(value || "").trim();

  if (!source) {
    return "";
  }

  if (source.startsWith("/") || isExternalOrSpecialUrl(source)) {
    return source;
  }

  return `${import.meta.env.BASE_URL}${source}`.replace(/([^:]\/)\/+/g, "$1");
}

export function getTravelCoverImage(post) {
  return resolveTravelAssetUrl(post?.coverImage || post?.gallery?.[0]?.url || "");
}
