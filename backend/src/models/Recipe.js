import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ["Sponge Cake", "Creamed Cake", "Cupcake","Fondant cake"],
      required: true
    },
    flavour: {
      type: String,
      enum: ["Chocolate", "Mango", "Vanilla", "Pineapple"],
      required: true
    },
    veg: {
      type: Boolean,
      required: true
    },
    units: {
      type: String,
      enum: ["250 grm", "1/2 kg", "1 kg", "2 kg", "6 units"],
      required: true
    },
    ingredients: {
      type: [
        {
          name: { type: String, required: true },
          quantity: { type: String, required: true },
        }
      ],
      default: []
    },
    toppings: {
      type: [String],
      default: []
    },
    
    ratings: {
      type: [Number],
      default: []
    },
    averageRating: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)
const Recipe= mongoose.model("Recipe", recipeSchema)
export default Recipe

