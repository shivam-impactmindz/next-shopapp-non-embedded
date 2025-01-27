export const getShopifyOAuthUrl = (shop) => {
  const params = new URLSearchParams({
    client_id: process.env.SHOPIFY_API_KEY,
    scope: process.env.SHOPIFY_API_SCOPES,
    redirect_uri: `${process.env.HOST}/api/auth/callback`,
    state: Math.random().toString(36).substring(7),
    grant_options: JSON.stringify(["per-user"]),
  });

  return `https://${shop}/admin/oauth/authorize?${params.toString()}`;
};

export const verifyShopifyHMAC = (query) => {
  const crypto = require("crypto");
  const { hmac, ...rest } = query;
  const message = Object.keys(rest)
    .sort()
    .map((key) => `${key}=${rest[key]}`)
    .join("&");

  const generatedHmac = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
    .update(message)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(generatedHmac), Buffer.from(hmac));
};