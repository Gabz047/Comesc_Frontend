import axios from "axios";

//Allows the application to make requisition with the backend
const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        "Content-Type": "application/json"
    }
})


//Add token automatically to every requisition if it needs a token to request

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {

        return Promise.reject(error);
    }
);

//Return an response for any requisition made
api.interceptors.response.use(
    (response) => response,
    (error) => {

        return Promise.reject(error);
    }
);

export default api
