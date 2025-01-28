import connectToDatabase from "@utils/database";

export default async function handler(req, res) {
    if (req.method === "GET") {
      const { shop } = req.query;
        await connectToDatabase();
    //   if (!shop || !shop.endsWith(".myshopify.com")) {
    //     return res.status(400).json({ error: "Invalid shop parameter" });
    //   }
  
    //   try {
    //     console.log(shop);
  
   
    //   } catch (error) {
     
       
    //   }
    } else {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  
  }