import shopify from "@/utils/shopify";
import Session from "@/src/models/session";


export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { session } = await shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });
      
      const { id, shop, state, scope, accessToken } = session;
       let existingsession = await Session.findOne({shop:shop});
       if(existingsession){
        console.log("alredy exist");
       }
       else{
        let newsession = new Session({
       id:id,
       shop:shop,
       state:state,
       scope:scope,
       accessToken:accessToken
        })

        await newsession.save();
       }


  

 
     
  

    
      res.redirect(`https://next-shopapp-non-embedded.vercel.app/about?host=${req.query.host}&shop=${shop}`);
    } catch (error) {
      console.error("Error during OAuth callback:", error);
      res.status(500).send("Error during authentication");
    } finally {
      await client.close();
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).send("Method Not Allowed");
  }
}