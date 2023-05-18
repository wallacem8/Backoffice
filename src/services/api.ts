import axios from "axios";

const api = axios.create({
    baseURL: "https://json-server-ex-v27k.onrender.com"
});

export default api;