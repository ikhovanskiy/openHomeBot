import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn, OneToMany} from "typeorm";
import {Receipt} from "./receipt.entity";
@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({type: "text",unique: true})
    login?: string;

    @Column({type: "text"})
    first_name?: string;

    @Column({type: "text",nullable: true})
    second_name?: string;

    @Column({type: "text",nullable: true})
    patronymic?: string;

    @Column({type: "text"})
    password?: string;

    @Column({type: "text",unique: true})
    email?: string;

    @CreateDateColumn()
    last_auth?: Date;
    
    @CreateDateColumn()
    created?: Date;

    @Column({type:"varchar",length: 10,nullable:true})
    phone?: string;

    @OneToMany(()=>Receipt,(receipt)=>receipt.user)
    receipts?: Receipt[];
}
