const { Router } = require("express");
const mainRouter = Router();
const recipesRoutes = require("./recipesRoutes");
const dietsRoutes = require("./dietRoutes");

mainRouter.use("/recipes", recipesRoutes);

mainRouter.use("/diets", dietsRoutes);

module.exports = mainRouter;
