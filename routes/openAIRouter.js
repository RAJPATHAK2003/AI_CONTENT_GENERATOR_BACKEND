const express=require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const openAIController = require("../controllers/openAIControllers");
const openAIRouter=express.Router();


openAIRouter.post("/generate-content", isAuthenticated,openAIController);
module.exports=openAIRouter;