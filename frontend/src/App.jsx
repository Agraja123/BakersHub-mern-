import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEditRecipe from "./pages/AddEditRecipe";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEditRecipe />} />
        <Route path="/edit/:id" element={<AddEditRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;