import { useEffect, useState } from "react";
import axios from "../lib/axios";
import RecipeCard from "../components/RecipeCard";
import Navbar from "../components/Navbar";
import FilterDrawer from "../components/FilterDrawer";
import { toastError, toastInfo } from "../lib/toast";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  const fetchRecipes = async (activeFilters = filters) => {
    const params = {};
    if (activeFilters.category) params.category = activeFilters.category;
    if (activeFilters.flavour) params.flavour = activeFilters.flavour;
    if (activeFilters.veg !== "") params.veg = activeFilters.veg;
    if (activeFilters.units) params.units = activeFilters.units;

    try {
      const res = await axios.get("/", { params });
      setRecipes(res.data);
    } catch {
      toastError("Failed to load recipes. Is the server running?");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    fetchRecipes(newFilters);
    const hasFilters = Object.values(newFilters).some((v) => v !== "");
    if (hasFilters) toastInfo("🔍 Filters applied.");
    else toastInfo("Filters cleared.");
  };

  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="drawer">
      <input id="filter-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <Navbar search={search} setSearch={setSearch} />

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              refresh={() => fetchRecipes()}
            />
          ))}
        </div>
      </div>

      <FilterDrawer onApply={handleApplyFilters} />
    </div>
  );
}
