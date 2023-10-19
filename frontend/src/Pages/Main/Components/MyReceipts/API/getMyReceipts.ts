export const getMyReceipts = (searchParams = '?') => {
    return fetch("/api/receipts/"+searchParams,{

        credentials: "include",
    }).then(res=> res.json())
  }