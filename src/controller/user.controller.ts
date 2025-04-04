import { Response, Request } from "express";
import { UserService } from "../service/user.service";

export class UserController {
  constructor(private readonly service: UserService) {
  }

  list = async (req: Request, res: Response) => {
    const { page: p, limit: l } = req.query;
    const page = Number(p);
    const limit = Number(l);
    const list = await this.service.paginate({ page, limit });
    res.send(list);
  }
  register = async (req: Request, res: Response) => {
    const payload = req.body;
    try{
      const user = await this.service.create(res, payload);
    res.status(201).json(user);
    } catch (e) {
      res.status(400).json(e);
    }
  }
  auth = async (req: Request, res: Response) => {
    const payload = req.body;
    try {
      const token = await this.service.auth(payload);
      res.status(200).json(token);
    } catch (e) {
      res.status(401).json(e);
    }
  }
}
