import axiosWithAutoriazation from "../axiosUtil"

export const addBrok = (brok) =>{
    return axiosWithAutoriazation().post('http://localhost:8080/api/brokerage/addBrokerage',brok).then(res=>res)
}

export const getBrok = (brok) =>{
    return axiosWithAutoriazation().get(`http://localhost:8080/api/brokerage/user/${localStorage.getItem("id")}`,brok).then(res=>res)
}