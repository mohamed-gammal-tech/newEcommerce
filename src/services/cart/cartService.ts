import { cartModel } from "../../models/cartModel";
import productModel from "../../models/productModel";

interface CreateCartForUser {
  userId: string;
}
const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({
    userId,
    items: [],
    total: 0,
    status: "active",
  });
  await cart.save();
  return cart;
};

interface getActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: getActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });
  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};

interface AddItemToCart {
  userId: string;
  productId: string;
  quantity: number;
}

export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });
  const product = await productModel.findById(productId);
  if (!product) {
    return { statusCode: 400, data: "Product not found" };
  }
  const itemExistsInCart = cart.items.find(
    (item) => item.product.toString() === productId
  );
  if (itemExistsInCart) {
    if (product.stock < itemExistsInCart.quantity + quantity) {
      return { statusCode: 400, data: `Product stock is ${product.stock}` };
    }
    itemExistsInCart.quantity += quantity;
    product.stock -= quantity;
    cart.total += product.price * quantity;
    await product.save();
    const updatedCart = await cart.save();
    return { statusCode: 200, data: updatedCart };
  }
  if (product.stock < quantity) {
    return { statusCode: 400, data: `Product stock is ${product.stock}` };
  }
  cart.items.push({ product: productId, unitPrice: product.price, quantity });
  cart.total += product.price * quantity;
  product.stock -= quantity;
  await product.save();
  const updatedCart = await cart.save();
  return { statusCode: 200, data: updatedCart };
};
