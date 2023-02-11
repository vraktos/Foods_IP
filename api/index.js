const app = require("./src/app");
const { sequelize } = require("./src/db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

app.listen(3001, async () => {
  sequelize.sync({ force: false });
  //   const myrecipes = (
  //     await axios.get(
  //       `https://api.spoonacular.com/recipes/complexSearch?number=100&instructionsRequired=true&addRecipeInformation=true&apiKey=${API_KEY}`
  //     )
  //   ).data;
  //   const cleanRecipe = myrecipes.results.map((recipe) => {
  //     let instructions = "";
  //     if (!recipe.analyzedInstructions[0]) {
  //       instructions = "There are no instructions for this recipe";
  //     } else {
  //       for (let action of recipe.analyzedInstructions[0].steps) {
  //         instructions = instructions + action.step + " ";
  //       }
  //     }
  //     return {
  //       id: recipe.id,
  //       image: recipe.image,
  //       title: recipe.title,
  //       diets: recipe.diets,
  //       summary: recipe.summary,
  //       healthScore: recipe.healthScore,
  //       instructions,
  //     };
  //   });

  //   let diets = [];
  //   cleanRecipe.forEach((recipe) => {
  //     for (let i = 0; i < recipe.diets.length; i++) {
  //       if (!diets.includes(recipe.diets[i])) {
  //         diets.push(recipe.diets[i]);
  //       }
  //     }
  //   });

  //   console.log("escuchando", diets);
  // });
});
