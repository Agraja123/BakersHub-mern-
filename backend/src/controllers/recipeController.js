import Recipe from "../models/Recipe.js";

export const addRecipe = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error("Error in addRecipe controller", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
export const getRecipes = async (req, res) => {
  try {
    const query = {};

    if (req.query.category) query.category = req.query.category;
    if (req.query.flavour) query.flavour = req.query.flavour;
    if (req.query.veg) query.veg = req.query.veg === "true";
    if (req.query.units) query.units = req.query.units;

    const recipes = await Recipe.find(query).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    console.error("Error in getRecipes controller", error)
    res.status(500).json({ message: "Internal server error" })

  }
}
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) 
      return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    console.error("Error in getRecipeById controller", error)
    res.status(500).json({ message: "Internal server error" });

  }
}
export const updateRecipe = async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.error("Error in updateRecipe controller", error)
    res.status(500).json({ message: "Internal server error" })

  }
}
export const deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error in deleteRecipe controller", error)
    res.status(500).json({ message: "Internal server error" })

  }
}
export const rateRecipe = async (req, res) => {
  try {
    const { rating } = req.body;
    const recipe = await Recipe.findById(req.params.id);

    recipe.ratings.push(rating);
    recipe.averageRating =
      recipe.ratings.reduce((a, b) => a + b, 0) /
      recipe.ratings.length;

    await recipe.save();
    res.json(recipe);
  } catch (error) {
    console.error("Error in rateRecipe controller", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
