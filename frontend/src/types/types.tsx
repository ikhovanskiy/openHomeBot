export interface IItem {
    id: string,
    name:string,
    price: number,
    quantity: number,
    producttype : {
        name: string
    }
}

export interface IReceipt {
        total_sum: number,
        retailplace: {
            name: string,
            address: string
        }
}