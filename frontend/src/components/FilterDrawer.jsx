import { useState } from "react";
import { categories, flavours, units } from "../lib/utils";

export default function FilterDrawer({ onApply }) {
  const [filters, setFilters] = useState({
    category: "",
    flavour: "",
    units: "",
    veg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleApply = () => {
    onApply(filters);
  };

  const handleClear = () => {
    const cleared = {
      category: "",
      flavour: "",
      units: "",
      veg: "",
    };
    setFilters(cleared);
    onApply(cleared);
  };

  return (
    <div className="drawer-side z-40">
      <label htmlFor="filter-drawer" className="drawer-overlay"></label>

      <div className="menu p-6 w-80 min-h-full bg-base-200 text-base-content space-y-6">

        <h2 className="text-xl font-bold">🎂 Filters</h2>

        {/* CATEGORY */}
        <div>
          <label className="label font-semibold">Category</label>
          <select
            name="category"
            className="select select-bordered w-full"
            value={filters.category}
            onChange={handleChange}
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* FLAVOUR */}
        <div>
          <label className="label font-semibold">Flavour</label>
          <div className="space-y-2">
            {flavours.map((flav) => (
              <label key={flav} className="label cursor-pointer gap-2">
                <input
                  type="radio"
                  name="flavour"
                  value={flav}
                  checked={filters.flavour === flav}
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
          <label className="label font-semibold">Size</label>
          <select
            name="units"
            className="select select-bordered w-full"
            value={filters.units}
            onChange={handleChange}
          >
            <option value="">All</option>
            {units.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        {/* VEG / NON VEG */}
        <div>
          <label className="label font-semibold">Type</label>
          <select
            name="veg"
            className="select select-bordered w-full"
            value={filters.veg}
            onChange={handleChange}
          >
            <option value="">All</option>
            <option value="true">Veg</option>
            <option value="false">Non-Veg</option>
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={handleApply}
            className="btn btn-primary flex-1"
          >
            Apply
          </button>

          <button
            onClick={handleClear}
            className="btn btn-outline flex-1"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}