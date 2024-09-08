import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel";

export interface ExtendRequest extends Request {
  user?: any;
}

export const validateJWT = (
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.get("authorization");
  if (!authorizationHeader) {
    return res.status(401).send("Unauthorized");
  }
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  // validate token
  jwt.verify(
    token,
    process.env.SECRET_KEY || "defaultSecretKey",
    async (err, payloadData) => {
      // if token is invalid
      if (err) {
        return res.status(401).send("Invalid token");
      }
      if (!payloadData) {
        return res.status(401).send("Invalid token data");
      }
      // Log the payload data to debug
      console.log("Payload Data:", payloadData);

      // if token is valid fetch user data from database
      const userPayloadData = payloadData as {
        user: {
          email: string;
          firstName: string;
          lastName: string;
        };
      };
      console.log("Searching for user with email:", userPayloadData.user.email);

      const user = await userModel.findOne({
        email: userPayloadData.user.email,
      });
      console.log("User found:", user);

      if (!user) {
        return res.status(401).send("User not found");
      }

      req.user = user;
      next();
    }
  );
};
