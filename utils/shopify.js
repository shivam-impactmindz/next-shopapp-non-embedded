import { Shopify } from "@shopify/shopify-api";

export const shopify = new Shopify({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SHOPIFY_API_SCOPES.split(","),
  hostName: process.env.HOST.replace(/^https?:\/\//, ""),
  apiVersion: process.env.SHOPIFY_API_VERSION,
  isEmbeddedApp: true,
});




// import Shopify from "@shopify/shopify-api";

// const shopify = new Shopify({
//   apiKey: process.env.SHOPIFY_API_KEY,
//   apiSecretKey: process.env.SHOPIFY_API_SECRET,
//   scopes: process.env.SHOPIFY_API_SCOPES.split(","),
//   hostName: new URL(process.env.HOST).host,
// });

// export default shopify;
