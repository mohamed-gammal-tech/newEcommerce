import jwt from "jsonwebtoken";

const secretKey =
  '^rK(*p7`lNcIUoO^rDTF@"QT,(#">^Ctl$f(Q!aq|d5G@[_YZ2ug!L&E4AsJrq2';
export const generateJWT = (user: any) => {
  return jwt.sign({ user }, secretKey);
};
