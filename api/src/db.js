const { Sequelize, DataTypes, UUIDV4, UUID } = require("sequelize");
const DietsModel = require("./models/DietsModel");
const RecipesModel = require("./models/RecipesModel");
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`
);

RecipesModel(sequelize);
DietsModel(sequelize);

const { Recipes, Diets } = sequelize.models;

Recipes.belongsToMany(Diets, { through: "RecipeDiet" });
Diets.belongsToMany(Recipes, { through: "RecipeDiet" });

module.exports = { sequelize, Recipes, Diets };
