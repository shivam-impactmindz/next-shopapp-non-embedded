import  shopify  from "@/utils/shopify";

export default async function handler(req, res) {
  console.log("hello");
  const shop = req.query.shop;
  if (!shop) return res.status(400).send("Missing shop parameter");

  const authRoute = await shopify.auth.beginAuth(req, res, shop, "/api/auth/callback", false);
  res.redirect(authRoute);
}












// // pages/api/auth/index.js
// import { URLSearchParams } from "url";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { shop } = req.body;

//     if (!shop) {
//       return res.status(400).send("Missing shop parameter.");
//     }

//     try {
//       const params = new URLSearchParams({
//         client_id: process.env.SHOPIFY_API_KEY,
//         scope: process.env.SHOPIFY_API_SCOPES,
//         redirect_uri: `${process.env.HOST}/api/auth/callback`,
//         state: Math.random().toString(36).substring(7),
//         grant_options: JSON.stringify(["per-user"]),
//       });

//       const authUrl = `https://${shop}/admin/oauth/authorize?${params.toString()}`;
//       res.status(200).json({ data: authUrl, isSuccess: true });
//     } catch (error) {
//       console.error("Error redirecting to Shopify OAuth:", error);
//       return res.status(500).send("Internal Server Error");
//     }
//   } else {
//     res.status(405).send("Method Not Allowed");
//   }
// }