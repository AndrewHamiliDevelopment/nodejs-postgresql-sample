import { NextFunction, Request, Response, Router } from "express";
import { DataSource } from "typeorm";
import { ProjectsService } from "../service/projects.service";
import { ProjectsController } from "../controller/projects.controller";
import { verifyToken } from "../middleware/auth.middleware";
export class ProjectsRouter {
    constructor(private readonly dataSource: DataSource) {}
    getRouter() : Router {
        const router = Router();
        const projectsService = new ProjectsService(this.dataSource);
        const projectsController = new ProjectsController(projectsService);
        router.get("", verifyToken, projectsController.list)
        router.post("", verifyToken, projectsController.create);
        return router;
    }
}