/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    ENCRYPTION_STRING: process.env.ENCRYPTION_STRING,
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
