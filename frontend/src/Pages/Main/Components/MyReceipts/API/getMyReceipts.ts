export const getMyReceipts = () => {
    return fetch("/api/receipts/",{
        credentials: "include",
    }).then(res=> res.json())
  }