import dotenv from "dotenv";

import jwt from "jsonwebtoken";
dotenv.config();
export const createToken = (id, expiresIn = null) => {
  try {
    const options = expiresIn ? { expiresIn } : {};
    const token = jwt.sign({ _id: id }, process.env.secret_key, options);
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, process.env.secret_key);
    return decode;
  } catch (error) {
    throw new Error(error);
  }
};
