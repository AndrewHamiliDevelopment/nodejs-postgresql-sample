import { Request, Response } from "express";
import { ProjectsService } from "../service/projects.service";

export class ProjectsController {
  constructor(private service: ProjectsService) {}

  list = async (req: Request, res: Response) => {
    const { page: p, size: s } = req.query;
    const page = Number(p ?? 1);
    const size = Number(s ?? 5);
    console.log("pagination", { page, size });
    const list = await this.service.paginate({ page, size });
    res.send(list);
  }
  create = async (req: Request, res: Response) => {
    if(!req.body) {
        res.status(400).send({message: 'No Payload'})
    }
    const payload = req.body;
    try {
      const add = await this.service.add(res, payload);
      res.status(201).send(add);
    } catch (e) {
      res.status(400).send(e);
    }
  }
}
