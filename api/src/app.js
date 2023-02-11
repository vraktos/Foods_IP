const express = require("express");
const morgan = require("morgan");
const app = express();
const mainRouter = require("./routes");

app.use(morgan("dev"));
app.use(express.json());

app.use(mainRouter);

module.exports = app;
