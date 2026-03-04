import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../lib/axios";
import { categories, flavours, units, toppingsList } from "../lib/utils";
import Navbar from "../components/Navbar";
import { toastSuccess, toastError, toastWarning } from "../lib/toast";

export default function AddEditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    flavour: "",
    veg: true,
    units: "",
    toppings: [],
    ingredients: [],
  });

  const [newIngredient, setNewIngredient] = useState({ name: "", quantity: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      axios.get(`/${id}`)
        .then((res) => {
          setFormData({ ...res.data, ingredients: res.data.ingredients || [] });
        })
        .catch(() => toastError("Failed to load recipe."));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "toppings") {
      setFormData({
        ...formData,
        toppings: checked
          ? [...formData.toppings, value]
          : formData.toppings.filter((t) => t !== value),
      });
    } else if (type === "checkbox" && name === "veg") {
      setFormData({ ...formData, veg: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddIngredient = () => {
    if (!newIngredient.name.trim() || !newIngredient.quantity.trim()) {
      toastWarning("Please fill both ingredient name and quantity.");
      return;
    }
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { ...newIngredient }],
    });
    setNewIngredient({ name: "", quantity: "" });
    toastSuccess(`🧂 "${newIngredient.name}" added!`);
  };

  const handleRemoveIngredient = (index) => {
    const removed = formData.ingredients[index].name;
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
    toastWarning(`"${removed}" removed.`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) { toastError("Cake name is required."); return; }
    if (!formData.description.trim()) { toastError("Recipe description is required."); return; }
    if (!formData.category) { toastWarning("Please select a category."); return; }
    if (!formData.flavour) { toastWarning("Please select a flavour."); return; }
    if (!formData.units) { toastWarning("Please select a size / unit."); return; }

    setLoading(true);
    try {
      if (isEdit) {
        await axios.put(`/${id}`, formData);
        toastSuccess("✏️ Recipe updated successfully!");
      } else {
        await axios.post("/", formData);
        toastSuccess("🎂 Recipe added successfully!");
      }
      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      console.error("Error saving recipe", error);
      toastError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <div className="card bg-base-100 shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isEdit ? "✏ Edit Recipe" : "➕ Add New Recipe"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}
            <div>
              <label className="label">Cake Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* RECIPE */}
            <div>
              <label className="label">Recipe</label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* INGREDIENTS */}
            <div>
              <label className="label font-semibold">🧂 Ingredients</label>
              {formData.ingredients.length > 0 && (
                <ul className="mb-3 space-y-2">
                  {formData.ingredients.map((ing, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-base-200 rounded-lg px-4 py-2"
                    >
                      <span>
                        <span className="font-medium">{ing.name}</span>
                        <span className="text-gray-500 ml-2">— {ing.quantity}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(index)}
                        className="btn btn-xs btn-error btn-outline"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ingredient (e.g. Flour)"
                  className="input input-bordered flex-1"
                  value={newIngredient.name}
                  onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Quantity (e.g. 2 cups)"
                  className="input input-bordered flex-1"
                  value={newIngredient.quantity}
                  onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
                />
                <button type="button" onClick={handleAddIngredient} className="btn btn-secondary">
                  + Add
                </button>
              </div>
            </div>

            {/* CATEGORY */}
            <div>
              <label className="label">Category</label>
              <select
                name="category"
                className="select select-bordered w-full"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* FLAVOUR */}
            <div>
              <label className="label">Flavour</label>
              <div className="flex gap-4 flex-wrap">
                {flavours.map((flav) => (
                  <label key={flav} className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="flavour"
                      value={flav}
                      checked={formData.flavour === flav}
                      onChange={handleChange}
                      className="radio radio-primary"
                    />
                    {flav}
                  </label>
                ))}
              </div>
            </div>

            {/* UNITS */}
            <div>
              <label className="label">Size / Units</label>
              <select
                name="units"
                className="select select-bordered w-full"
                value={formData.units}
                onChange={handleChange}
              >
                <option value="">Select Size</option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>

            {/* VEG */}
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Veg Cake</span>
                <input
                  type="checkbox"
                  name="veg"
                  className="toggle toggle-success"
                  checked={formData.veg}
                  onChange={handleChange}
                />
              </label>
            </div>

            {/* TOPPINGS */}
            <div>
              <label className="label">Toppings</label>
              <div className="flex gap-4 flex-wrap">
                {toppingsList.map((top) => (
                  <label key={top} className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      name="toppings"
                      value={top}
                      checked={formData.toppings.includes(top)}
                      onChange={handleChange}
                      className="checkbox checkbox-secondary"
                    />
                    {top}
                  </label>
                ))}
              </div>
            </div>

            {/* SUBMIT */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className={`btn btn-primary w-full ${loading && "loading"}`}
                disabled={loading}
              >
                {isEdit ? "Update Recipe" : "Add Recipe"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}
