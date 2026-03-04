import axios from "axios";

const instance = axios.create({
  baseURL: "https://bakershub-backend.onrender.com/recipes",
});

export default instance;
