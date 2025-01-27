/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
    SHOPIFY_API_SCOPES: process.env.SHOPIFY_API_SCOPES,
    HOST: process.env.HOST,
    MONGO_URI: process.env.MONGO_URI,
  },
};

export default nextConfig;

// export default {
//   env: {
//     SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
//     SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
//     SHOPIFY_API_SCOPES: process.env.SHOPIFY_API_SCOPES,
//     DATABASE_URL: process.env.DATABASE_URL,
//     HOST: process.env.HOST,
//   },
// };
