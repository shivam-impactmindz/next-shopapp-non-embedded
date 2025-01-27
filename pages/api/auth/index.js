import  shopify  from "@/utils/shopify";

import { URLSearchParams } from "url";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { shop } = req.body;

    if (!shop || !shop.endsWith(".myshopify.com")) {
      return res.status(400).send("Invalid or missing shop parameter.");
    }

    try {
      const params = new URLSearchParams({
        client_id: process.env.SHOPIFY_API_KEY,
        scope: process.env.SHOPIFY_API_SCOPES,
        redirect_uri: `${process.env.HOST}/api/auth/callback`,
        state: Math.random().toString(36).substring(7),
      });

      const authUrl = `https://${shop}/admin/oauth/authorize?${params.toString()}`;
  return res.status(200).json({authUrl:authUrl,isSuccess:true});
    } catch (error) {
      console.error("Error redirecting to Shopify OAuth:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
