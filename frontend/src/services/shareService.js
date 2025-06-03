import axiosWithAutoriazation from "../axiosUtil"

export const addShare = (share) =>{
    return axiosWithAutoriazation().post('http://localhost:8080/api/shares/addShare',share).then(res=>res)
}

export const getShare =() =>{
    return axiosWithAutoriazation().get(`http://localhost:8080/api/shares/user/${localStorage.getItem("id")}`).then(res=>res)
}

export const getShareName=(id)=>{
    return axiosWithAutoriazation().get(`http://localhost:8080/api/shares/${id}`).then(res=>res)
}

export const deleteShare =(id)=>{
    return axiosWithAutoriazation().delete(`http://localhost:8080/api/shares/${id}`).then(res=>res)
}

export const updateShare=(share)=>{
    return axiosWithAutoriazation().put(`http://localhost:8080/api/shares/${share.id}`,share).then(res=>res)
}