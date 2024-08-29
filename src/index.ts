import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/user", userRouter);

mongoose
  .connect("mongodb://localhost:27017/new_ecommerce")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
