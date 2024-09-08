import userModel from "../../models/userModel";
import bcrypt from "bcrypt";
import { generateJWT } from "./generateJWT";
interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    return { data: "User Not Found", statusCode: 400 };
  }

  const isPasswordMatch = await bcrypt.compare(password, findUser.password);
  if (!isPasswordMatch) {
    return { data: "Password In correct", statusCode: 400 };
  }
  return {
    data: generateJWT({
      email,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
    }),
    statusCode: 200,
  };
};
