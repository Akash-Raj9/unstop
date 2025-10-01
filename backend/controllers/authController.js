import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.models.js";

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const register = async (req, res) => {
  const { name, email, password, college, phone } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Name, email & password are required" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 8);
  const user = await User.create({ name, email, password: hashedPassword, college, phone });

  res.status(201).json({
    user,
    token: generateToken({ id: user._id, role: user.role }),
  });
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    user,
    token: generateToken({ id: user._id, role: user.role }),
  });
};


export const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPass = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPass) return;

  const exists = await User.findOne({ email: adminEmail });
  if (!exists) {
    const hashedPassword = await bcrypt.hash(adminPass, 8);
    await User.create({ name: "Admin", email: adminEmail, password: hashedPassword, role: "admin" });
    console.log("Admin seeded");
  } else {
    console.log("Admin exists");
  }
};

