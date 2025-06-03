import axiosWithAutoriazation from "../axiosUtil"

export const addPurchase = (purchase) =>{
    return axiosWithAutoriazation().post('http://localhost:8080/api/purchase/addPurchase',purchase).then(res=>res)
}

export const getUserPurchase = () =>{
    return axiosWithAutoriazation().get(`http://localhost:8080/api/purchase/user/${localStorage.getItem("id")}`).then(res=>res)
}

export const deletePurchase =(id)=>{
    return axiosWithAutoriazation().delete(`http://localhost:8080/api/purchase/${id}`).then(res=>res)
}

export const getPurchase=(id)=>{
    return axiosWithAutoriazation().get(`http://localhost:8080/api/purchase/${id}`).then(res=>res)    
}

export const updatePurchase=(purchase)=>{
    return axiosWithAutoriazation().put(`http://localhost:8080/api/purchase/${purchase.id}`,purchase).then(res=>res)
}