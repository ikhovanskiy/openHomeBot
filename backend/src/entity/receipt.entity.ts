import {Entity,PrimaryGeneratedColumn,Column,ManyToMany,CreateDateColumn,JoinTable,ManyToOne,OneToMany,OneToOne,JoinColumn} from "typeorm";
import {User} from "./user.entity";
import {Item} from "./item.entity";
import {Retailplace} from "./retailplace.entity";

@Entity()
export class Receipt{
    @PrimaryGeneratedColumn("uuid")
    id?: string;
    
    @Column({type:"numeric", precision: 16, scale:2})
    total_sum?: number;
    
    @CreateDateColumn()
    date_time?: Date;

    @ManyToOne(()=> User, (user)=>user.receipts)
    user?: User;

    @ManyToMany(()=>Item,{
        cascade: true
    })
    @JoinTable()
    items?: Item[];

    @ManyToOne(()=>Retailplace,(retailplace)=>retailplace.receipts)
    @JoinColumn()
    retailplace: Retailplace;
}
