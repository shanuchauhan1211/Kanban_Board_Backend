import User from "../model/user.js";
import { hashPassword, verifyPassword } from "../utils/bcryptUtils.js";
import { createToken } from "../utils/jwtUtils.js";

export const register = async (req, res) => {
  try {
    const { UserName, email, password } = req.body;
    const loweredCase = email.toLowerCase();

    if (await User.findOne({ email: loweredCase })) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = await User.create({
      UserName,
      email: loweredCase,
      password: await hashPassword(password),
    });

    return res.status(201).json({ message: "User is successfully registered" });

  } catch (error) {
    console.error("Error Creating New User:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const logIn = async (req, res) => {
  try {
    const { emailOrname, password } = req.body;
    console.log(`Name: ${emailOrname} , Password: ${password}`);
    const loweredCase = emailOrname.toLowerCase();
    const exisitingUser = await User.findOne({ $or:[{email:loweredCase}, {UserName:emailOrname}]});

    if (!exisitingUser) {
      return res.status(404).json({ message: " Invalid account NO data " });
    }
    const isPasswordCorrect = await verifyPassword(password, exisitingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password!" });
    } else {
        delete exisitingUser._doc.password;
      const token = await createToken(exisitingUser._id);
      res.status(200).json({ result: exisitingUser, jwt:token });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
