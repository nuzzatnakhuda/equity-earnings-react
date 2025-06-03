import axiosWithAutoriazation from "../axiosUtil"

export const addSales = (sales) =>{
    return axiosWithAutoriazation().post('http://localhost:8080/api/sales/addSales',sales).then(res=>res)
}

export const getUserSales = () =>{
    return axiosWithAutoriazation().get(`http://localhost:8080/api/sales/user/${localStorage.getItem("id")}`).then(res=>res).catch(err=>err)
}

export const deleteSales =(id)=>{
    return axiosWithAutoriazation().delete(`http://localhost:8080/api/sales/${id}`).then(res=>res)
}

export const getSales=(id)=>{
    return axiosWithAutoriazation().get(`http://localhost:8080/api/sales/${id}`).then(res=>res)    
}

export const updateSales=(sales)=>{
    return axiosWithAutoriazation().put(`http://localhost:8080/api/sales/${sales.id}`,sales).then(res=>res)
}