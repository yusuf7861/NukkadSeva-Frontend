import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api", // Adjust if backend runs on different port
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
