import axios from "axios";


const axiosWithAutoriazation = () => {
    const instance = axios.create({
        baseURL: "http://localhost:8080",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    return instance;
}

export default axiosWithAutoriazation;
