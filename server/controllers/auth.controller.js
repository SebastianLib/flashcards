import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(500)
        .json({ msg: "a user with this email address already exists" });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    const {password, ...rest} = newUser._doc
    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const validUser = await User.findOne({ email: req.body.email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const validPassword = await bcrypt.compare(
      req.body.password,
      validUser.password
    );
    if (!validPassword) return next(errorHandler(404, "wrong credentials!"));
    const { password, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
    try {
      if(req.body.password){
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
      );
      
      if (!updatedUser) return next(errorHandler(404, "User not found!"));
  
      const { password, ...rest } = updatedUser._doc;
  
      res.status(201).json(rest);
    } catch (error) {
      next(error);
    }
  };
  