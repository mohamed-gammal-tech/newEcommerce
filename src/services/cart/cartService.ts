import { cartModel, ICartItem } from "../../models/cartModel";
import { IOrderItem, orderModel } from "../../models/orderModel";
import productModel, { IProduct } from "../../models/productModel";

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
    if (product.stock < quantity) {
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

interface UpdateItemInCart {
  userId: string;
  productId: string;
  quantity: number;
}

export const updateItemInCart = async ({
  userId,
  productId,
  quantity,
}: UpdateItemInCart) => {
  const cart = await getActiveCartForUser({ userId });
  const product = await productModel.findById(productId);
  if (!product) {
    return { statusCode: 400, data: "Product not found" };
  }
  const itemExistsInCart = cart.items.find(
    (item) => item.product.toString() === productId
  );
  if (!itemExistsInCart) {
    return { statusCode: 400, data: "Item not found in cart" };
  }
  console.log(product.stock, itemExistsInCart.quantity, quantity);
  if (product.stock + itemExistsInCart.quantity - quantity < 0) {
    return { statusCode: 400, data: `Product stock is ${product.stock}` };
  }
  if (quantity < 0) {
    return { statusCode: 400, data: "Quantity must be greater than zero" };
  }
  cart.total -= itemExistsInCart.unitPrice * itemExistsInCart.quantity;
  cart.total += itemExistsInCart.unitPrice * quantity;
  product.stock += itemExistsInCart.quantity - quantity;
  itemExistsInCart.quantity = quantity;
  await product.save();
  const updatedCart = await cart.save();
  return { statusCode: 200, data: updatedCart };
};

interface deleteItemFromCart {
  userId: string;
  productId: string;
}

export const deleteItemFromCart = async ({
  userId,
  productId,
}: deleteItemFromCart) => {
  const cart = await getActiveCartForUser({ userId });
  const product = await productModel.findById(productId);
  if (!product) {
    return { statusCode: 400, data: "Product not found" };
  }
  const itemExistsInCart = cart.items.find(
    (item) => item.product.toString() === productId
  );
  if (!itemExistsInCart) {
    return { statusCode: 400, data: "Item not found in cart" };
  }
  product.stock += itemExistsInCart.quantity;
  cart.total -= itemExistsInCart.unitPrice * itemExistsInCart.quantity;
  const otherCartItems = cart.items.filter(
    (item) => item.product.toString() !== productId
  );
  cart.items = otherCartItems;
  await product.save();
  const updatedCart = await cart.save();
  return { statusCode: 200, data: updatedCart };
};

interface ClearCart {
  userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getActiveCartForUser({ userId });
  cart.items.forEach(async (item) => {
    const product = await productModel.findById(item.product);
    if (!product) {
      return { statusCode: 400, data: "Product not found" };
    }
    product.stock += item.quantity;
    await product.save();
  });
  cart.items = [];
  cart.total = 0;
  const updatedCart = await cart.save();
  return { statusCode: 200, data: updatedCart };
};

interface Checkout {
  userId: string;
  address: string;
}

export const checkout = async ({ userId, address }: Checkout) => {
  const cart = await getActiveCartForUser({ userId });
  const orderItems: IOrderItem[] = [];
  // cart.items.forEach(async (item) => {
  //   const product = await productModel.findById(item.product);
  //   if (!product) {
  //     return { statusCode: 400, data: "Product not found" };
  //   }
  //   const orderItem: IOrderItem = {
  //     productTitle: product.title,
  //     productImage: product.image,
  //     unitPrice: item.unitPrice,
  //     quantity: item.quantity,
  //   };
  //   orderItems.push(orderItem);
  // });
  for (const item of cart.items) {
    const product = await productModel.findById(item.product);
    if (!product) {
      return { statusCode: 400, data: "Product not found" };
    }
    const orderItem: IOrderItem = {
      productTitle: product.title,
      productImage: product.image,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    };
    orderItems.push(orderItem);
  }
  const order = await orderModel.create({
    userId,
    orderItems,
    total: cart.total,
    address,
  });

  await order.save();
  cart.status = "completed";
  await cart.save();
  return { statusCode: 200, data: order };
};
