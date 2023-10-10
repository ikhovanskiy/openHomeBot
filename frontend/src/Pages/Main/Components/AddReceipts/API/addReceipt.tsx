import { BACKEND_API } from "../../../../../config"
import { IItem, IReceipt } from "../../../../../types/types"

export const addReceipt = (receipt:IReceipt, items:IItem[]) => {
    return fetch(BACKEND_API+'receipts/add/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
            receipt: receipt,
            items: items
      })
    }).then(res=> res.json())}