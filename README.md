# 🎂 BakersHub

A full-stack MERN application for managing and discovering baking recipes. BakersHub allows users to browse, add, edit, delete, and rate recipes — with filtering by category, flavour, dietary preference, and serving size.

🔗 **Live Demo:** [https://bakershub-frontend.onrender.com](https://bakershub-frontend.onrender.com)

---

## ✨ Features

- 📋 **Browse Recipes** — View all baking recipes in a responsive card grid
- 🔍 **Search** — Filter recipes by name in real time
- 🎛️ **Advanced Filters** — Filter by category, flavour, dietary type (veg/non-veg), and unit size
- ➕ **Add Recipe** — Create new recipes with ingredients, toppings, and details
- ✏️ **Edit Recipe** — Update any existing recipe
- 🗑️ **Delete Recipe** — Remove recipes with a single click
- ⭐ **Rate Recipes** — Submit star ratings; average rating is calculated automatically
- 📱 **Responsive UI** — Built with Tailwind CSS + DaisyUI for a clean, mobile-friendly design

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| React Router DOM v7 | Client-side routing |
| Axios | HTTP requests |
| Tailwind CSS | Utility-first styling |
| DaisyUI | Component library |
| Framer Motion | Animations |
| React Hot Toast | Notifications |
| Lucide React | Icons |
| Vite | Build tool & dev server |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express 5 | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |

---

## 📁 Project Structure

```
BakersHub-mern/
├── backend/
│   └── src/
│       ├── config/
│       │   └── db.js               # MongoDB connection
│       ├── controllers/
│       │   └── recipeController.js # Route handler logic
│       ├── models/
│       │   └── Recipe.js           # Mongoose schema
│       ├── routes/
│       │   └── recipeRoutes.js     # API route definitions
│       └── server.js               # Express app entry point
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── FilterDrawer.jsx    # Slide-out filter panel
│       │   ├── Logo.jsx            # Brand logo
│       │   ├── Navbar.jsx          # Top navigation + search
│       │   ├── RatingStars.jsx     # Star rating component
│       │   └── RecipeCard.jsx      # Recipe preview card
│       ├── lib/
│       │   ├── axios.js            # Axios instance with base URL
│       │   ├── toast.js            # Toast notification helpers
│       │   └── utils.js            # Utility functions
│       ├── pages/
│       │   ├── AddEditRecipe.jsx   # Add / Edit recipe form
│       │   ├── Home.jsx            # Recipe listing page
│       │   └── RecipeDetails.jsx   # Single recipe view
│       ├── App.jsx                 # Route definitions
│       └── main.jsx                # React entry point
│
└── package.json
```

---

## 🗄️ Data Model

### Recipe Schema

| Field | Type | Description |
|---|---|---|
| `name` | String | Recipe name (required) |
| `description` | String | Short description (required) |
| `category` | String | `Sponge Cake`, `Creamed Cake`, `Cupcake`, `Fondant cake` |
| `flavour` | String | `Chocolate`, `Mango`, `Vanilla`, `Pineapple` |
| `veg` | Boolean | Vegetarian or not |
| `units` | String | `250 grm`, `1/2 kg`, `1 kg`, `2 kg`, `6 units` |
| `ingredients` | Array | List of `{ name, quantity }` objects |
| `toppings` | Array | List of topping strings |
| `ratings` | Array | Array of submitted number ratings |
| `averageRating` | Number | Auto-calculated average of ratings |
| `createdAt` | Date | Auto-generated timestamp |
| `updatedAt` | Date | Auto-generated timestamp |

---

## 🔌 API Endpoints

Base URL: `https://bakershub-backend.onrender.com`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/recipes` | Get all recipes (supports query filters) |
| `POST` | `/recipes` | Create a new recipe |
| `GET` | `/recipes/:id` | Get a single recipe by ID |
| `PUT` | `/recipes/:id` | Update a recipe by ID |
| `DELETE` | `/recipes/:id` | Delete a recipe by ID |
| `POST` | `/recipes/:id/rate` | Submit a rating for a recipe |

### Query Parameters for `GET /recipes`

| Param | Type | Example |
|---|---|---|
| `category` | String | `?category=Cupcake` |
| `flavour` | String | `?flavour=Chocolate` |
| `veg` | Boolean | `?veg=true` |
| `units` | String | `?units=1 kg` |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Agraja123/BakersHub-mern-.git
cd BakersHub-mern-
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3001
```

Start the backend server:

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The backend will run at `http://localhost:3001`

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
```

If running locally, update `src/lib/axios.js` to point to your local backend:

```js
const instance = axios.create({
  baseURL: "http://localhost:3001/recipes",
});
```

Start the frontend dev server:

```bash
npm run dev
```

The frontend will run at `http://localhost:5173`

---

## ☁️ Deployment

This project is deployed on **Render**.

### Backend (Web Service)
- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:** `MONGO_URI`, `PORT`

### Frontend (Static Site)
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`

> ⚠️ **Note:** Render's free tier spins down services after 15 minutes of inactivity. The first request after sleeping may take 30–60 seconds.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 👩‍💻 Author

**Agraja** — [@Agraja123](https://github.com/Agraja123)

---

## 📄 License

This project is open source and available under the [ISC License](LICENSE).
