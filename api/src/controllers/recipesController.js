const { Recipes, Diets } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
require("dotenv").config();
const { API_KEY } = process.env;

const createRecipe = async (
  id,
  title,
  summary,
  healthScore,
  instructions,
  diets
) => {
  const newRecipe = await Recipes.create({
    id,
    title,
    summary,
    healthScore,
    instructions,
  });
  newRecipe.addDiets([...diets]);
  return newRecipe;
};

const getRecipeById = async (source, id) => {
  let recipe = {};

  if (source === "db") {
    recipe = await Recipes.findByPk(id, {
      include: [
        {
          model: Diets,
          through: { attributes: ["DietName"] },
        },
      ],
    });
    const diets = recipe.Diets.map((diet) => {
      return diet.name;
    });
    // diets comes in a Diet key with info I don't need, so i clean it up and return it

    return (cleanRecipe = {
      title: recipe.title,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      instructions: recipe.instructions,
      diets: diets,
    });
  }
  // If the recipe is in my db, i want to find it via it's id joined with it's associated diets y return it
  else {
    recipe = (
      await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`
      )
    ).data;
    return (cleanRecipe = {
      image: recipe.image,
      title: recipe.title,
      diets: recipe.diets,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      instructions: recipe.instructions,
    });
  }
};

// If the diet's not in my db, I ask for it from the API and clean it up before returning it

const getRecipeByQuery = async (name) => {
  const result = [];
  const dbRecipes = await Recipes.findAll({
    where: {
      title: {
        [Op.like]: `%${name}%`,
      },
    },
  });

  dbRecipes.map((recipe) => {
    result.push(recipe);
  });

  const apiRecipes = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY}`
    )
  ).data;

  apiRecipes.results.map((recipe) => {
    result.push(recipe);
  });
  if (result.length === 0) {
    throw new Error("No se encontraron resultados");
  }
  return result;
};
// Not finished. When i search for a recipe, i look for it in my db and also in the API , return the results

module.exports = { createRecipe, getRecipeById, getRecipeByQuery };
