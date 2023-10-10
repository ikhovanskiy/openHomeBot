import passport from "passport";
import passportLocal from "passport-local";
import {AppDataSource} from "../database";
import {User} from "../entity";
import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcryptjs";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user:User,done:any)=>{        
    done(null, user.id);
});

passport.deserializeUser((id:string,done:any)=>{    
    AppDataSource.manager.findOneBy(User,{id:id})
    .then((user:User)=>{
        return done(null, user);
    })
    .catch(
        (err:Error)=>{
            return done(err);
        }
    );
});

passport.use(new LocalStrategy({usernameField: "email"},(email:string, password:string, done:any)=>{        
    AppDataSource.manager.findOneBy(User,{email:email.toLowerCase()})
    .then((user:User)=>{
        if (!user){                    
            return done(undefined, false, { message: `Логин ${email} не найден` });
        }        

        bcrypt
        .compare(password,user.password)
        .then((isMatch:boolean)=>{
            if (isMatch){
                return done(undefined, user);
            }            
            return done(undefined, false, { message: "Пароль не правильный" });
        })
        .catch((err:Error)=>{
            return done(err);
        });

        
    }        
    )
    .catch(
        (err:Error)=>{            
            return done(err);
        }
    );
}));

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(404);
    res.json({err:"Войдите в систему!"});        
};
