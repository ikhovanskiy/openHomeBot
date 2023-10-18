export const getMyReceipts = () => {
    return fetch("/api/receipts/" ,{

        credentials: "include",
    }).then(res=> res.json())
    .catch(e=>console.log(e))
  }