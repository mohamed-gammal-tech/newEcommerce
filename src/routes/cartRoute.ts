import express from "express";
import {
  addItemToCart,
  checkout,
  clearCart,
  deleteItemFromCart,
  getActiveCartForUser,
  updateItemInCart,
} from "../services/cart/cartService";
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
cartRouter.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

cartRouter.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const response = await updateItemInCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

cartRouter.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.params;
      const response = await deleteItemFromCart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

cartRouter.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

cartRouter.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const {address} = req.body;
    const response = await checkout({ userId,address });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

export default cartRouter;
