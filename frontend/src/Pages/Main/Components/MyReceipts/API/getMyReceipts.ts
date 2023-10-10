// import { BACKEND_API } from "../../../../../config"



export const getMyReceipts = () => {
    return fetch("http://localhost:3001/receipts/",{
        credentials: "include",
    }).then(res=> res.json())
  }