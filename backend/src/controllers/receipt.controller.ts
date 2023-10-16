import { AppDataSource } from "../database";
import { Request, Response, NextFunction } from "express";
import { User, Receipt, Item, Producttype, Retailplace } from "../entity";
import { receiptLoader } from "../helpers";

export const getReceiptbyId = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const id: string = req.params["id"];

        if (id) {
            AppDataSource.manager.find(Receipt,
                {
                    relations: ["items", "retailplace", "items.producttype"],
                    where: {
                        id: id
                    }
                })
                .then((receipt: Receipt[]) => {
                    res.json(receipt);
                })
                .catch((err: any) => {
                    next(err);
                });
        } else {
            res.json({ err: "Не передан id чека!" });
        }
    } catch (err: any) {

    }
};

export const getUserReceipt = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const user = req.user as User;
        AppDataSource.manager.find(Receipt, {
            relations: ["items", "retailplace", "items.producttype",],
            where: {
                user: {
                    id: user.id
                }
            }

        })
            .then((receipts: Receipt[]) => {
                res.json(receipts);
            })
            .catch((err: any) => {
                next(err);
            });
    } catch (err: any) {
        next(err);
    }
};

export const postAddReceipt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
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

        res.end();
    } catch (err: any) {
        next(err);
    }
};

export const postReceiptsByQR = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const qqrrow = req.body.qrraw as string;        
        const receiptdata = await receiptLoader(qqrrow);
        const code = receiptdata.code as number;
        
        if (code != 1) {
            res.json(receiptdata);
        }        

        const producttype_rep = AppDataSource.getRepository(Producttype);
        const item_rep = AppDataSource.getRepository(Item);
        const retailplace_rep = AppDataSource.getRepository(Retailplace);

        const receipt = new Receipt();
        receipt.user = req.user;

        receipt.items = await Promise.all(receiptdata.data.json.items.map(async (val: any) => {            
            
            const producttype = await producttype_rep.findOneBy({id:val.productType});
            
            const item = new Item();
            item.price = val.price * 0.01;
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
        
        retailplace.name = receiptdata.data.json.retailPlace;
        retailplace.address = receiptdata.data.json.metadata.address;

        retailplace_rep.
            createQueryBuilder()
            .insert()
            .into(Retailplace)
            .values(retailplace)
            .onConflict(`(\"name\") DO UPDATE SET name = '${retailplace.name}'`)
            .returning("*")
            .execute();

        receipt.total_sum = receiptdata.data.json.totalSum * 0.01;
        receipt.retailplace = retailplace;

        await AppDataSource.manager.save(receipt);

        res.end();


    } catch (err: any) {
        next(err);
    }
};