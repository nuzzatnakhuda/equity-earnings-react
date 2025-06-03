import axios from "axios";
import axiosWithAutoriazation from "../axiosUtil"

const userSreviceUrl = "http://localhost:8080/api/users";

export const userInvest = (userId) => {
    return axiosWithAutoriazation().get(`${userSreviceUrl}/invested/${userId}`).then(res=>res);
}

export const login = (data) => {
    return axios.post(`${userSreviceUrl}/login`, data).then(res=>res);
}

export const userStock = (id)=>{
    return axiosWithAutoriazation().get(`${userSreviceUrl}/userStock/${id}`).then(res=>res)
}

export const userProfit = ()=>{
    return axiosWithAutoriazation().get(`${userSreviceUrl}/profit/${localStorage.getItem('id')}`).then(res=>res)
}