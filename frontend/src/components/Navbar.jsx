import { Link, useLocation } from "react-router-dom";
import { Search, Filter, Plus, Home } from "lucide-react";

export default function Navbar({ search, setSearch }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="navbar bg-base-200 shadow-md px-4 sticky top-0 z-30">

      {/* LEFT - Logo/Brand always visible */}
      <div className="flex-none flex items-center gap-2">
        {isHome && (
          <label htmlFor="filter-drawer" className="btn btn-ghost">
            <Filter size={20} />
          </label>
        )}
        {!isHome && (
          <Link to="/" className="btn btn-ghost btn-sm gap-1">
            <Home size={18} />
            <span className="hidden sm:inline">Home</span>
          </Link>
        )}
        <Link to="/" className="text-xl font-bold text-pink-500 tracking-wide ml-1">
          🍰 BakerHub
        </Link>
      </div>

      {/* CENTER - Search (only on home) */}
      <div className="flex-1 flex justify-center">
        {isHome && (
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search cakes..."
              className="input input-bordered w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute right-3 top-3 text-gray-400" size={18} />
          </div>
        )}
      </div>

      {/* RIGHT - Add Recipe (only on home) */}
      <div className="flex-none">
        {isHome && (
          <Link to="/add" className="btn btn-primary btn-sm sm:btn-md gap-1">
            <Plus size={18} />
            <span>Add Recipe</span>
          </Link>
        )}
      </div>

    </div>
  );
}
