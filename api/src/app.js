const express = require("express");
const morgan = require("morgan");
const app = express();
const mainRouter = require("./routes");

// const axios = require("axios");
// require("dotenv").config();
// const { API_KEY } = process.env;

app.use(morgan("dev"));
app.use(express.json());

app.use(mainRouter);

// app.get("/onehundred", async (req, res) => {
//   const myrecipes = (
//     await axios.get(
//       `https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY}`
//     )
//   ).data;
//   res.json(myrecipes);
// });

module.exports = app;
