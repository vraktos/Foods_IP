const { Router } = require("express");
const { getDietsHandlers } = require("../handlers/dietsHandlers");

const dietsRoutes = Router();

dietsRoutes.get("/", getDietsHandlers);

module.exports = dietsRoutes;
