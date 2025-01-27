// pages/api/auth/callback.js
import shopify from "@/utils/shopify";
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { session } = await shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });

      console.log("Session:", session);

      // Save session details to MongoDB
      await client.connect();
      const database = client.db("shopifyapp");
      const sessions = database.collection("sessions");

      const { shop, accessToken, scope, isOnline, expires } = session;

      const sessionData = {
        shop,
        accessToken,
        scope,
        isOnline,
        expires,
        createdAt: new Date(),
      };

      await sessions.updateOne(
        { shop },
        { $set: sessionData },
        { upsert: true }
      );

      console.log("Session saved to MongoDB.");

      // Redirect to the about page with shop info
      res.redirect(`/about?host=${req.query.host}&shop=${shop}`);
    } catch (error) {
      console.error("Error in auth callback:", error);
      res.status(500).send("Error during authentication");
    } finally {
      await client.close();
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
