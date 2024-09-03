import express from "express";
import { getActiveCartForUser } from "../services/cart/cartService";
import { ExtendRequest, validateJWT } from "../middlewares/validateJWT";

const cartRouter = express.Router();
cartRouter.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

export default cartRouter;
