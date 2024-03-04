const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let secretKey; // Declare secretKey variable

const generateSecretKey = () => {
  secretKey = crypto.randomBytes(32).toString("hex"); // Initialize secretKey
  return secretKey;
};

generateSecretKey(); // Call generateSecretKey to initialize secretKey

mongoose
  .connect(
    "mongodb+srv://avigtoli1991:aXHAjHza0Df5EKRp@cluster0.vbn2ikb.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB!", error);
  });

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

const User = require("./models/user");
const todo = require("./models/todo");
const jwt = require("jsonwebtoken");

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if user is already registred
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered");
    }

    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    res.status(202).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error registring the user", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    console.log("Login failed", error);
    res.status(500).json({ message: "Login failed" });
  }
});
