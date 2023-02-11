const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Diets", {
    id: {
      type: DataTypes.UUID,

      defaultValue: UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
  });
};
