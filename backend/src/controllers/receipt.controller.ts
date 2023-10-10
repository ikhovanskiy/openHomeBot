import { AppDataSource } from "../database";
import { Request, Response, NextFunction } from "express";
import { User, Receipt, Item, Producttype, Retailplace } from "../entity";

export const getReceiptbyId = (req: Request, res: Response): void => {
    const id: string = req.params["id"];

    if (id) {
        AppDataSource.manager.find(Receipt,
            {
                relations: ["items","retailplace","items.producttype"],
                where: {
                    id: id
                }
            })
            .then((receipt: Receipt[]) => {
                res.json(receipt);
            })
            .catch((err: Error) => {
                console.log(err);
                res.json({ err: err });
            });
    } else {
        res.json({ err: "Не передан id чека!" });
    }
};

export const getUserReceipt = (req: Request, res: Response): void => {
    const user = req.user as User;
    AppDataSource.manager.find(Receipt, {
        relations: ["items","retailplace","items.producttype",],
        where: {
            user: {
                id: user.id
            }
        }

    })
        .then((receipts: Receipt[]) => {
            res.json(receipts);
        })
        .catch((err: Error) => {
            res.json({ err: err });
            console.log(err);
        });
};

export const postAddReceipt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const producttype_rep = AppDataSource.getRepository(Producttype);
    const item_rep = AppDataSource.getRepository(Item);
    const retailplace_rep = AppDataSource.getRepository(Retailplace);

    const receipt = new Receipt();
    receipt.user = req.user;

    receipt.items = await Promise.all(req.body.items.map(async (val: any) => {

        const producttype = new Producttype();
        producttype.name = val.producttype.name;
        await producttype_rep.
            createQueryBuilder()
            .insert()
            .into(Producttype)
            .values(producttype)
            .onConflict(`(\"name\") DO UPDATE SET name = '${producttype.name}'`)
            .returning("*")
            .execute();

        const item = new Item();
        item.price = val.price;
        item.name = val.name;
        item.quantity = val.quantity;        
        item.producttype = producttype;
        await item_rep.
            createQueryBuilder("item")            
            .insert()
            .into(Item)
            .values(item)            
            .returning("*")
            .execute();


        return item;
    }));

    const retailplace = new Retailplace();
    retailplace.name = req.body.receipt.retailplace.name;
    retailplace.address = req.body.receipt.retailplace.address;

    retailplace_rep.
        createQueryBuilder()
        .insert()
        .into(Retailplace)
        .values(retailplace)
        .onConflict(`(\"name\") DO UPDATE SET name = '${retailplace.name}'`)
        .returning("*")
        .execute();

    receipt.total_sum = req.body.receipt.total_sum;
    receipt.retailplace = retailplace;
    await AppDataSource.manager.save(receipt);    

    res.redirect("/");
};