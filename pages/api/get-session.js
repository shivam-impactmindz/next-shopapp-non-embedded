import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { shop } = req.query;

  if (!shop) {
    return res.status(400).json({ error: "Missing shop parameter" });
  }

  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const database = client.db("shopifyapp");
    const sessions = database.collection("sessions");

    const session = await sessions.findOne({ shop });

    if (!session || !session.installed) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.status(200).json({ session });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
