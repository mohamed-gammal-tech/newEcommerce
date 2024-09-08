import express from "express";
import { register } from "../services/users/register";
import { login } from "../services/users/login";

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { data, statusCode } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(statusCode).send(data);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, statusCode } = await login({ email, password });
    res.status(statusCode).send(data);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

export default userRouter;