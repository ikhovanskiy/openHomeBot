<<<<<<< HEAD
export const getMyReceipts = () => {
    return fetch("/api/receipts/",{
=======
// import { BACKEND_API } from "../../../../../config"



export const getMyReceipts = () => {
    return fetch("http://localhost:3001/receipts/",{
>>>>>>> master
        credentials: "include",
    }).then(res=> res.json())
  }