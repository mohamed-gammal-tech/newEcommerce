import { Box, Container, Grid2 } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/Product";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(true);
        console.log("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  if (error) {
    return <Box> something went wrong, Error fetching products</Box>;
  }

  return (
    <Container>
      <div>
        <h1>Welcome to the ProShop</h1>
        <p>We sell the best products for cheap</p>
      </div>
      <Grid2 container spacing={3}>
        {products.map((product) => (
          <Grid2 width={365}>
            <ProductCard {...product} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default HomePage;
