const {
  createRecipe,
  getRecipeById,
  getRecipeByQuery,
} = require("../controllers/recipesController");

const getRecipeByQueryHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const recipe = await getRecipeByQuery(name);
    console.log(recipe);
    res.status(200).json(recipe);
  } catch (error) {
    res.json({ error: error.message });
  }
};
const getRecipeByIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "db" : "api";
  try {
    const recipe = await getRecipeById(source, id);
    res.status(200).json(recipe);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const postRecipes = async (req, res) => {
  try {
    const { id, title, summary, healthScore, instructions, diets } = req.body;
    const newRecipe = await createRecipe(
      id,
      title,
      summary,
      healthScore,
      instructions,
      diets
    );
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getRecipeByIdHandler, getRecipeByQueryHandler, postRecipes };
