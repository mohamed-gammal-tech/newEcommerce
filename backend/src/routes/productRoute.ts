import express from "express";
import { getAllProducts } from "../services/products/productsService";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

export default productRouter;
