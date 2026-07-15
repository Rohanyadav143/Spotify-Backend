import userModel from "../models/user.model.js";
import { generateToken } from "../middlewares/token.middleware.js";
import { hashPassword } from "../middlewares/hashPassword.middleware.js";

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password, role = "user" } = req.body;

    const isUserNameAlreadyExist = await userModel.findOne({ userName });

    if (isUserNameAlreadyExist) {
      return res.status(409).send({
        message: "User Name already exists",
      });
    }

    const isUserEmailAlreadyExist = await userModel.findOne({ email });

    if (isUserEmailAlreadyExist) {
      return res.status(409).send({
        message: "Email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      role,
    });

    const token = await generateToken(user._id, role);

    res.cookie("token", token);

    res.status(200).send({
      message: "User registered successfully",
      user: {
        id: user._id,
        userName: userName,
        email: email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: error.message,
    });
  }
};




