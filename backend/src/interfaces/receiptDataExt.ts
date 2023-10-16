interface receiptDataExt{
    code:number,
    data:dataReceipt
}

interface dataReceipt{
    json:jsonDataReceipt,
}

interface metaData{
    address: string,
    receiveDate: string
}

interface items{
    name:string,
    price:number,
    quantity:number,
    productType: number
}

interface jsonDataReceipt{
    items:items[],
    metadata:metaData,
    retailPlace:string,
    totalSum: number,    
}


export default receiptDataExt;