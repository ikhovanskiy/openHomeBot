import dotenv from "dotenv";
import {receiptDataExt} from "../interfaces";

const receiptLoader = async (qrString:string):Promise<receiptDataExt>=>{
    const data = {
        token: process.env.RECEIPTS_API_KEY,
        qrraw: qrString
    };    

    const headers={
        "Content-Type":"application/x-www-form-urlencoded"
    };

    const response = await fetch(process.env.RECEIPTS_API_PATH,{
        method: "POST",
        headers: headers,
        body: new URLSearchParams(data)
    });

    const receipts_data = await response.json();
        
    return receipts_data;
};   

export default receiptLoader;