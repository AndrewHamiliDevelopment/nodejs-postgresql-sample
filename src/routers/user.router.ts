import { Router } from "express";
import { DataSource } from "typeorm";
import { UserService } from "../service/user.service";
import { UserController } from "../controller/user.controller";
import { verifyToken } from "../middleware/auth.middleware";

export class UserRouter {
    constructor(private readonly dataSource: DataSource) {

    }
    getRouter(): Router {
        const router = Router();
        const userService = new UserService(this.dataSource);
        
        const userController = new UserController(userService);
        router.get('', verifyToken, userController.list);
        router.post('/register', userController.register);
        return router;
    }
}