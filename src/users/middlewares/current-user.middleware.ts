import { Injectable, NestMiddleware } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"
import { UsersService } from "../users.service"
import { User } from "../users.entity";

declare global {
    namespace Express {
        interface Request {
            currentUser?: User
        }
    }
}

@Injectable()
export class CurrentUserMiddleWare implements NestMiddleware {
    constructor(private usersService: UsersService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const { id } = req.session || {};

        if (id) {
            const user = await this.usersService.findOne(id);
            req.currentUser = user;
        }
        next()
    }
}