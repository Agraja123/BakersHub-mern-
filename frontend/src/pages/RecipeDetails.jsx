import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import Navbar from "../components/Navbar";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`/${id}`).then((res) => setRecipe(res.data));
  }, [id]);

  if (!recipe) return (
    <>
      <Navbar />
      <p className="text-center mt-10">Loading...</p>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold">{recipe.name}</h1>
        <p className="mt-4">{recipe.description}</p>
        <p className="mt-2">Category: {recipe.category}</p>
        <p>Flavour: {recipe.flavour}</p>
        <p>Units: {recipe.units}</p>
        <p>Veg: {recipe.veg ? "Yes" : "No"}</p>

        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">🧂 Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, index) => (
                <li key={index} className="flex justify-between bg-base-200 rounded-lg px-4 py-2">
                  <span className="font-medium">{ing.name}</span>
                  <span className="text-gray-500">{ing.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
