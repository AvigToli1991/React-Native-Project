const express = require("express"); // הסביבה איתה עובדים לצורך טיפול בבקשות כמו 'GET' ו 'POST' 
const bodyParser = require("body-parser"); // חילוץ המידע מהסביבה 
const mongoose = require("mongoose"); // המאגר נתונים שלנו שאיתו ה express יעבוד
const crypto = require("crypto"); // מודל ההצפנה של נוד ג'יי אסס לצורך הצפנת הסיסמאות וכדומא

const app = express();
const port = 3000;
const cors = require("cors"); // על מנת לאבטח שהשרת יגיב כראוי מבקשות צולבות מכל מיני מקורות CORS ייבוא תוכנת ביינים 
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose      //התחברות למאגר הדטה בייס
  .connect(
    "mongodb+srv://avigtoli1991:aXHAjHza0Df5EKRp@cluster0.vbn2ikb.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Error connectin to MongoDB!", error);
  });

app.listen(port, () => {   // בקשה מהסביבה בה אנו משתמשים להאזין לפורט שלנו בשרת
  console.log("Server is running on port 3000");
});

const User = require('./models/user');
const todo = require('./models/todo');
const jwt = require("jsonwebtoken");

app.post("/register",async(req,res)=>{
  try{
    const {name,email,password}=req.body;

    //check if user is already registred 
    const existingUser = await User.findOne({email});
    if (existingUser){
      console.log("Email already registered");
    }

    const newUser = new User({
      name,
      email,
      password
    });
    await newUser.save();
    res.status(202).json({message: "User registered successfully"})
  }catch(error){
    console.log("Error registring the user", error);
    res.status(500).json({message: "Registration failed"})
  }
})
const generateSecretKey = () =>{
  secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
}

const secretKey = generateSecretKey();

app.post("/login", async(req,res)=>{
 
  try{
    const {email,password} = req.body;

    //check if user is existing
    const user = await User.findOne({email});
    if (!user){
      return res.status(401).json({message:"Invalid email"});
    }
    if(user.password !== password){
      return res.status(401).json({message:"Invalid password"});
    }

    const token = jwt.sign({userId:user._id},secretKey);

    res.status(200).json({token});
  }catch(error){
    console.log("Login failed",error);
    res.status(500).json({message:"Login failed"});
  }
  
});