import userModel from "../../models/userModel";
import bcrypt from "bcrypt";
import { generateJWT } from "./generateJWT";
interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email });
  if (findUser) {
    return { data: "User already exists", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  return {
    data: generateJWT({
      email,
      firstName,
      lastName,
    }),
    statusCode: 201,
  };
};
