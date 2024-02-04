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
