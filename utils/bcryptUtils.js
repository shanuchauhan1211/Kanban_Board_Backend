import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isPasswordMatch;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
