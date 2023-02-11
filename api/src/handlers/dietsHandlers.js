const { getDietsController } = require("../controllers/dietController");

const getDietsHandlers = async (req, res) => {
  try {
    const diets = await getDietsController();
    res.status(200).json(diets);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { getDietsHandlers };
