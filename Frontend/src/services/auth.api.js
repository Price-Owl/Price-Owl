import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5000",
    withCredentials: true
})

export async function register({name, email, password, confirmPassword}) {

    try {
        const response = await api.post("/api/auth/register", {
            name,
            email,
            password,
            confirmPassword
        })
        return response.data;
    }
    catch (error) {
    return {
        success: false,
        message: error.response?.data?.message || "Something went wrong, please try again."
    };
}
    
}

export async function login({email, password}) {

    try {
        const response = await api.post("/api/auth/login", {
            email,
            password,
        })
        return response.data;
    } catch (error) {
        return {
        success: false,
        message: error.response?.data?.message || "Something went wrong, please try again."
    };
    }
}

export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me");
        console.log("response::", response);
        return response.data;
    } catch (error) {
        return {
        success: false,
        message: error.response?.data?.message || "Something went wrong, please try again."
    };
    }
}
