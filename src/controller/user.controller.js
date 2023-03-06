import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const test = async (req, res) => {
  const { body, method } = req;
  res.status(201).json({ method, data: body });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await new User({ name, email, password });
    await user.save();
    res.status(200).json({ message: "User successfully Added" });
  } catch (e) {
    if (e?.code === 11000)
      return res.status(500).json({ message: "User is already exist!" });
    res.status(500).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user && (await user.isPasswordMatched(password))) {
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_ACCESS_EXPIRATION,
        }),
      });
    } else {
      res.status(401).json({ message: "please enter valid email-id password" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.updateOne({ email }, { password: process.env.DEFAULT_PASSWORD })
    if (!user) return res.status(500).json({ message: "Please Enter Valid Email Id" });
    res.status(200).json({ message: "Password reset Successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
