import { shopify } from "@/utils/shopify";

export const verifyRequest = async (req, res, next) => {
  try {
    const session = await shopify.auth.validateAuthCallback(req, res);
    req.session = session;
    next();
  } catch (error) {
    res.redirect(`/api/auth?shop=${req.query.shop}`);
  }
};
