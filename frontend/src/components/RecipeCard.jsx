import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
import axios from "../lib/axios";
import { toastSuccess, toastError } from "../lib/toast";
import toast from "react-hot-toast";

export default function RecipeCard({ recipe, refresh }) {

  const handleDelete = async () => {
    toast(
      (t) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={{ fontWeight: 600 }}>🗑️ Delete <em>{recipe.name}</em>?</span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await axios.delete(`/${recipe._id}`);
                  toastSuccess(`"${recipe.name}" deleted.`);
                  refresh();
                } catch {
                  toastError("Failed to delete recipe.");
                }
              }}
              style={{
                background: "#f87171",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "6px 14px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "13px",
              }}
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#e2e8f0",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                padding: "6px 14px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
        style: {
          background: "#1a1a2e",
          color: "#e2e8f0",
          border: "1px solid rgba(248,113,113,0.35)",
          borderRadius: "12px",
          padding: "16px 18px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          maxWidth: "320px",
        },
      }
    );
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{recipe.name}</h2>
        <p>{recipe.flavour} • {recipe.units}</p>

        <div className="flex justify-between items-center mt-4">
          <RatingStars rating={recipe.averageRating} />
          <div className="flex gap-3">
            <Link to={`/recipe/${recipe._id}`}>
              <Eye className="cursor-pointer text-blue-500" />
            </Link>
            <Link to={`/edit/${recipe._id}`}>
              <Pencil className="cursor-pointer text-yellow-500" />
            </Link>
            <Trash2 onClick={handleDelete} className="cursor-pointer text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
