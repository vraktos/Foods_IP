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
  const recipe =
    source === "db"
      ? await Recipes.findByPk(id, {
          include: [
            {
              model: Diets,
              through: { attributes: ["DietName"] },
            },
          ],
        })
      : (
          await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`
          )
        ).data;

  if (source === "db") {
    const diets = recipe.Diets.map((diet) => {
      return diet.name;
    });
    return (cleanRecipe = {
      title: recipe.title,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      instructions: recipe.instructions,
      diets: diets,
    });
  } else {
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

module.exports = { createRecipe, getRecipeById, getRecipeByQuery };
