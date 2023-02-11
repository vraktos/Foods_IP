const { Diets } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getDietsController = async () => {
  const diets = (
    await axios.get(
      `https://api.spoonacular.com/recipes/1095693/information?apiKey=${API_KEY}&addRecipeInformation=true`
    )
  ).data.diets;

  const lastDiet = (
    await axios.get(
      `https://api.spoonacular.com/recipes/642129/information?apiKey=${API_KEY}&addRecipeInformation=true`
    )
  ).data.diets[2];
  diets.push(lastDiet);

  diets.map(async (diet) => {
    await Diets.create({ name: `${diet}` });
  });
  return diets;
};

module.exports = { getDietsController };
