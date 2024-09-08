import jwt from "jsonwebtoken";

export const generateJWT = (user: any) => {
  return jwt.sign({ user }, process.env.SECRET_KEY || "defaultSecretKey");
};
