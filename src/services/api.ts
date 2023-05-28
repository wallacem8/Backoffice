import axios from "axios";

const api = axios.create({
    baseURL: "https://site-pessoal-api-4r1s.onrender.com/api"
});

export default api;