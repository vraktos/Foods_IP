const { Router } = require("express");
const {
  getRecipeByQueryHandler,
  getRecipeByIdHandler,
  postRecipes,
} = require("../handlers/recipesHandlers");

const recipesRoutes = Router();

recipesRoutes.get("/", getRecipeByQueryHandler);

recipesRoutes.get("/:id", getRecipeByIdHandler);

recipesRoutes.post("/", postRecipes);

module.exports = recipesRoutes;
