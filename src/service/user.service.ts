import { DataSource, Repository } from "typeorm";
import { User } from "../entity/User";
import { Paginated } from "../interfaces";
import { ExtendedRequest } from "../shared";
import { UserAddDto } from "./dto/user-add.dto";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { each, has } from "lodash";
import { UserAuthDto } from "./dto/user-auth.dto";
import * as jwt from "jsonwebtoken";

const secretKey = "";

export class UserService {
  private readonly repository: Repository<User>;
  constructor(private readonly appDataSource: DataSource) {
    this.repository = appDataSource.manager.getRepository(User);
  }
  list = async () => {
    return await this.repository.find();
  };
  paginate = async (props: {
    page?: number;
    limit?: number;
  }): Promise<Paginated<User>> => {
    const { page, limit: take } = props;
    const skip = ((page ?? 1) - 1) * take;
    const paginatedUsers = await this.repository.findAndCount({ take, skip });
    return {
      data: paginatedUsers[0],
      totalItems: paginatedUsers[1],
      page,
      limit: take,
    };
  };
  create = async (dto: UserAddDto) => {
    const errorsArray: any[] = [];
    try {
      const payload = new UserAddDto();
      Object.assign(payload, dto);
      const errors = await validate(payload);
      await each(errors, async (e) => errorsArray.push(e.constraints));
      if (errorsArray.length > 0) throw new Error(JSON.stringify(errorsArray));
      const { username, password, role } = payload;
      return await this.repository.save({ username, password, role });
    } catch (e) {
      console.error("error", e);
      if (has(e, "message")) {
        errorsArray.push({ other: e.message });
      }
    }
    return Promise.reject(errorsArray);
  };
  auth = async (dto: UserAuthDto) => {
    const errorArray: any[] = [];
    try {
      const payload = new UserAuthDto();
      Object.assign(payload, dto);
      const errors = await validate(payload);
      await each(errors, async (e) => errorArray.push(e.constraints));
      if (errorArray.length > 0) {
        throw new Error(JSON.stringify(errorArray));
      }
      const { username, password } = payload;
      const user = await this.repository.findOne({
        where: { username, password },
      });
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
      });
      return { token };
    } catch (e) {
      console.error("error", e);
      if (has(e, "message")) {
        errorArray.push({ other: e.message });
      }
    }
    return Promise.reject(errorArray);
  };
}
