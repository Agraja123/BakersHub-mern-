import express from "express"
import {addRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe, rateRecipe } from "../controllers/recipeController.js";

const router = express.Router()

router.post("/", addRecipe)
router.get("/", getRecipes)
router.get("/:id", getRecipeById)
router.put("/:id", updateRecipe)
router.delete("/:id", deleteRecipe)
router.post("/:id/rate", rateRecipe)

export default router
