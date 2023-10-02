import {Entity,PrimaryGeneratedColumn,Column,Unique,OneToMany} from "typeorm";
import {Receipt} from "./receipt.entity";

@Entity()
@Unique(["name"])
export class Retailplace{
    @PrimaryGeneratedColumn("uuid")
    id?: string;
    
    @Column({type:"text"})
    name?: string;

    @Column({type:"text"})
    address?: string;    

    @OneToMany(()=>Receipt,(receipt)=>receipt.retailplace)
    receipts?: Receipt[];

}
