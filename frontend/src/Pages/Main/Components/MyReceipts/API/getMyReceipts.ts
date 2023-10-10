import { BACKEND_API } from "../../../../../config"

export const getMyReceipts = () => {
    return fetch(BACKEND_API+ "receipts/",{
        credentials: "include",
    }).then(res=> res.json())
  }