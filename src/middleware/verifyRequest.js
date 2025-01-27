import { verifyShopifyHMAC } from "@/utils/shopify";

export default function verifyRequest(handler) {
  return async (req, res) => {
    if (!verifyShopifyHMAC(req.query)) {
      return res.status(400).send("HMAC validation failed");
    }

    return handler(req, res);
  };
}
