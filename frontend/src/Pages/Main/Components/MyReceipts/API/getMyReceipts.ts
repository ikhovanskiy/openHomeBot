export const getMyReceipts = (searchParams = '?') => {
    return fetch("/api/receipts/"+searchParams,{        
    }).then(res=> res.json())
  }