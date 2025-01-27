// pages/api/auth/callback.js
import { getShopData, saveShopData } from "@/utils/database";
import { verifyHmac } from "@/utils/shopify";

export default async function handler(req, res) {
  const { shop, hmac, code } = req.query;

  if (!shop || !hmac || !code) {
    return res.status(400).send("Missing required parameters");
  }

  // Verify the HMAC signature
  const isValid = verifyHmac(req.query);
  if (!isValid) {
    return res.status(400).send("HMAC validation failed");
  }

  try {
    // Check if the shop is already installed
    const shopData = await getShopData(shop);
    if (shopData) {
      // Redirect to your about page if already installed
      return res.redirect(`${process.env.APP_URL}/about`);
    }

    // Generate the access token (you may use Shopify's access token exchange process here)
    const accessToken = "your_generated_access_token"; // Replace with actual token logic

    // Save shop details in the database
    await saveShopData(shop, accessToken);

    // Redirect to your app's homepage after installation
    return res.redirect(`${process.env.APP_URL}/about`);
  } catch (error) {
    console.error("Error during callback:", error);
    return res.status(500).send("Internal server error");
  }
}






// // pages/api/auth/callback.js
// import shopify from "@/utils/shopify";
// import { MongoClient } from "mongodb";

// const uri = process.env.DATABASE_URL;
// const client = new MongoClient(uri);

// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     try {
//       const { session } = await shopify.auth.callback({
//         rawRequest: req,
//         rawResponse: res,
//       });

//       console.log("Session:", session);

//       // Save session details to MongoDB
//       await client.connect();
//       const database = client.db("shopifyapp");
//       const sessions = database.collection("sessions");

//       const { shop, accessToken, scope, isOnline, expires } = session;

//       const sessionData = {
//         shop,
//         accessToken,
//         scope,
//         isOnline,
//         expires,
//         createdAt: new Date(),
//       };

//       await sessions.updateOne(
//         { shop },
//         { $set: sessionData },
//         { upsert: true }
//       );

//       console.log("Session saved to MongoDB.");

//       // Redirect to the about page with shop info
//       res.redirect(`/about?host=${req.query.host}&shop=${shop}`);
//     } catch (error) {
//       console.error("Error in auth callback:", error);
//       res.status(500).send("Error during authentication");
//     } finally {
//       await client.close();
//     }
//   } else {
//     res.status(405).send("Method Not Allowed");
//   }
// }
