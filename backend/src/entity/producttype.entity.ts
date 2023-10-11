import {Entity,PrimaryGeneratedColumn,Column,Unique,OneToMany} from "typeorm";
import {Item} from "./item.entity";

@Entity()
@Unique(["name"])
export class Producttype{
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column({type:"text"})
    name?: string;

    @OneToMany(() => Item, (item) => item.producttype)
    items: Item[];

}
