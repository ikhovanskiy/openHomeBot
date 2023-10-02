import { body, check, validationResult } from "express-validator";
import { genSalt, hash } from "bcrypt";
import { AppDataSource } from "../database";
import { User } from "../entity";
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { IVerifyOptions } from "passport-local";
import "../config/passport";
import * as bcrypt from "bcryptjs";

export const postLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check("email", "Не").isEmail().run(req);
    await check("password", "Пароль не может быть принят").isLength({ min: 6 }).run(req);
    await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.redirect("/auth/login/");
    }

    passport.authenticate("local", (err: Error, user: User, info: IVerifyOptions) => {
        if (err) { return next(err); }
        if (!user) {
            return res.json(info);
        }
        req.logIn(user, async (err) => {
            if (err) { return next(err); }
            res.redirect("/");
        });
    })(req, res, next);
};

export const getLogin = (req: Request, res: Response): void => {
    if (req.user) {
        return res.redirect("/");
    }

    res.redirect("/auth/login/");
};

export const logout = (req: Request, res: Response, next: NextFunction): void => {
    req.logout((err: Error) => {
        if (err) { return next(err); }
        res.redirect("/");
    });
};

export const postSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    await check("email", "Пожалуйста, введите верный формат электронной почты").isEmail().run(req);
    await check("password", "Не верный формат пароля: минимальная длина 6 символов").isLength({ min: 6 }).run(req);
    await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.redirect("/auth/signup/");
    }

    const user = new User();

    bcrypt
        .hash(req.body.password, 10)
        .then((hash: string) => {
            user.password = hash;
        }).then(() => {
            user.email = req.body.email;
            user.login = req.body.login;
            user.first_name = req.body.first_name;
            user.second_name = req.body.second_name;
            user.patronymic = req.body.patronymic;

            AppDataSource.manager.save(user)
                .then((user: User) => {
                    req.logIn(user, (err: Error) => {
                        if (err) {
                            return next(err);
                        }
                        res.redirect("/");
                    });
                })
                .catch((err: Error) => {
                    return next(err);
                });
        })
        .catch((err: Error) => {
            next(err);
        });

};

export const getAccount = (req: Request, res: Response): void => {
    res.redirect("/account/profile/");
};

export const postUpdateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check("email", "Пожалуйста, введите верный формат электронной почты").isEmail().run(req);
    await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.redirect("/account/profile/");
    }

    const user = req.user as User;

    AppDataSource.manager.findOneBy(User, { id: user.id })
        .then((user: User) => {
            return bcrypt
                .hash(req.body.password, 10)
                .then((hash: string) => {
                    user.password = hash;
                })
                .then(()=>{
                    user.email = req.body.email;
                    user.login = req.body.login;
                    user.first_name = req.body.first_name;
                    user.second_name = req.body.second_name;
                    user.patronymic = req.body.patronymic;
                    user.phone = req.body.phone;

                    return AppDataSource.manager.save(user);
                })
                .catch((err: Error) => {
                    next(err);
                });
            
        })
        .then((user: User) => {
            res.redirect("/");
        })
        .catch((err: Error) => {
            return next(err);
        });
};

