import axios from "axios"
const token = localStorage.getItem("token")


export const api=axios.create({
    baseURL:"http://localhost:300/api",
    withCredentials :true ,
    headers:{
        "Content-Type":"application/json",
         "Authorization": `Bearer ${token}`
    }
})








