import { Router } from "express";
import { DataSource } from "typeorm";
import { ProjectsRouter } from "./projects.router";
import { UserRouter } from "./user.router";
export class MainRouter {
    constructor(private readonly dataSource: DataSource) {}

    getRouter(): Router {
        const router = Router();
        const projectsRouter = new ProjectsRouter(this.dataSource);
        const userRouter = new UserRouter(this.dataSource);
        router.use("/projects", projectsRouter.getRouter());
        router.use("/users", userRouter.getRouter());
        return router;
    }

}