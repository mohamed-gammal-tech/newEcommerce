import productModel from "../../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const getProductById = async (id: string) => {
  return await productModel.findById(id);
};

export const seedIntialProducts = async () => {
  try {
    const products = [
      {
        title: "Dell laptop",
        description: "an amazing laptop",
        image: "https://i.ytimg.com/vi/eMJ9mDSSOh0/sddefault.jpg",
        price: 50000,
        stock: 10,
      },
    ];

    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.log(err);
    // res.status(500).send("Internal Server Error");
  }
};
