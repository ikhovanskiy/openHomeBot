
export const addReceiptQr = (qrraw: string) => {
  console.log(qrraw)
  return fetch('api/receipts/addByQr/', {
    method: 'POST',
    cache: 'no-cache',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "qrraw": qrraw
    })
  })
}