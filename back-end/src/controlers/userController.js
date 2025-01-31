import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const createUser = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { email } = userData;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: `The email ${email} already exists` });
    }

    const savedUser = await userData.save(); 

    const { password, ...rest } = userData;
    res.status(201).json({ message: "user created", data: rest });
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
};


export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(204).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
};


export const deleteUser = async (req, res) => {
  try {

    const _id = req.params.id;

    const userExist = await User.findOne({ _id });
    if (!userExist) {
      return res.status(404).json({ message: "The user does not exist" });
    }
    await User.findByIdAndDelete(_id);
    return res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    return res.status(500).json({ error: "error intero del servidor", error });
  }
};

export const updatedUser = async (req, res) => {
  try {
    const _id = req.params.id;

    const userExist = await User.findOne({ _id });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      { _id },
      req.body,
      { new: true }
    );
    return res.status(201).json(updatedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error });
  }
};

export const validate = async (req, res) => {
try {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "email and password are required" });
  }
  const userFound =await User.findOne({ email: req.body.email });
  if (!userFound) {
    return res.status(404).json({ message: "Incorrect email or password" });
  }
if (bcrypt.compareSync(req.body.password, userFound.password)){

  const payload = {
    userId: userFound._id,
    email: userFound.email,
  };
  const token = jwt.sign(payload, "secret", {expiresIn: "1d", });
  

  return res.status(200).json({message: "logged in",token});
} else{
  return res.status(404).json({ message: "Incorrect email or password" });
}
} catch (error) {
  return res.status(500).json({ message: "Internal server error", error });
}}