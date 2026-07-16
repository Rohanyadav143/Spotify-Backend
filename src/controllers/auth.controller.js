import userModel from "../models/user.model.js";
import { generateToken } from "../middlewares/token.middleware.js";
import {
  hashPassword,
  passwordChecker,
} from "../middlewares/hashPassword.middleware.js";

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

export const loginUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const user = await userModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (!user) {
      return res.status(401).send({
        message: "User not exist",
      });
    }
    console.log(user.password)
    const isPasswordCorrect = await passwordChecker(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).send({
        message: "Entered password is wrong",
      });
    }

    const token = await generateToken(user._id, user.role);

    res.cookie("token", token);

    res.status(200).send({
      message: "User login successfully",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(401).send({
      error: "User login error",
    });
  }
};

