import { getShopifyOAuthUrl } from "@/utils/shopify";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { shop } = req.body;

    if (!shop) {
      return res.status(400).json({ error: "Missing shop parameter." });
    }

    try {
      const authUrl = getShopifyOAuthUrl(shop);
      return res.status(200).json({ data: authUrl, isSuccess: true });
    } catch (error) {
      console.error("Error generating Shopify OAuth URL:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  res.status(405).json({ error: "Method Not Allowed" });
}