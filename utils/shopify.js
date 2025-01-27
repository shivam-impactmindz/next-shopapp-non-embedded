import { shopifyApi } from "@shopify/shopify-api";
import "@shopify/shopify-api/adapters/node";

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SHOPIFY_API_SCOPES.split(","),
  hostName: process.env.HOST.replace(/^https?:\/\//, ""), // Remove protocol from host
  apiVersion: process.env.SHOPIFY_API_VERSION || "2023-10", // Default API version
  isEmbeddedApp: true, // Use true for embedded apps, false otherwise
});

export default shopify;
