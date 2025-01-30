// pages/api/webhooks/uninstall.js
import { WebhookHandler } from "@shopify/shopify-api";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Verify the webhook payload (optional but recommended)
      const handler = new WebhookHandler(process.env.SHOPIFY_API_SECRET);
      const isValid = await handler.verify(req);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid webhook signature" });
      }

      // Extract shop name from the webhook payload
      const { shop_domain: shop } = req.body;

      // Update MongoDB to mark the app as uninstalled
      await client.connect();
      const database = client.db("shopifyapp");
      const sessions = database.collection("sessions");

      await sessions.updateOne(
        { shop },
        { $set: { installed: false } }
      );

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error handling uninstallation:", error);
      res.status(500).json({ error: "Failed to handle uninstallation" });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method Not Allowed" });
  }
}