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

export interface IProfile {
    created: string,
    email: string,
    first_name: string,
    id: string,
    last_auth: string,
    login: string,
    patronymic: string,
    phone: string | null,
    second_name: string

}