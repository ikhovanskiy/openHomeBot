import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn, ManyToMany,ManyToOne, OneToMany,OneToOne,JoinColumn,Unique} from "typeorm";
import {Receipt} from "./receipt.entity";
import {Producttype} from "./producttype.entity";

@Entity()
export class Item{
    @PrimaryGeneratedColumn("uuid")
    id?: string;
    
    @Column({type:"numeric", precision: 16, scale:2})
    price?: number;

    @Column({type:"numeric", precision: 16})
    quantity?: number;

    @Column({type:"text"})
    name?:string;    

    @ManyToOne(()=>Producttype,(producttype)=>producttype.items)    
    producttype?: Producttype;

    @ManyToMany(()=>Receipt)    
    receipts?: Receipt[];
}
