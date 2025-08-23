const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req, res) => {
  try {
    console.log("Signup request body:", req.body); // Add this line
    const { name, emailId, phoneNumber, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await new User({
      name: name,
      emailId: emailId,
      phoneNumber: phoneNumber,
      password: passwordHash,
    });
    const savedUser = await user.save();
    const token = generateToken({ _id: savedUser._id });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true, // Added for security
      secure: process.env.NODE_ENV === "production", // Added for production security
      sameSite: "strict", // Added for CSRF protection
    });

    // Don't send password in response
    const { password: _, ...userResponse } = savedUser.toObject();
    res.json({ message: "User registered successfully!", data: userResponse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken({ _id: user._id });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  res.cookie("token", null, {
     expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
  });
  res.send("Logout Successful!!");
};

module.exports = { signup, login, logout };
