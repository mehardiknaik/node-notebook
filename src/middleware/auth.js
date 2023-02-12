import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const auth = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1]
        if (!token) return res.status(401).json({ message: "No credentials" });
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findById(id)
        if (!user) return res.status(401).json({ message: "Invalid credentials" });
        req.userId = user._id
        next()
    }
    catch (error) {
        res.status(401).json({ message: error.message })
    }
}