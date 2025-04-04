import { DataSource, Repository } from "typeorm";
import { Projects } from "../entity/projects";
import { ProjectsAddDto } from "./dto/projects-add.dto";
import { validate, validateOrReject } from "class-validator";
import { Response } from "express";
import { each, has } from "lodash";
import { Paginated } from "../interfaces";

export class ProjectsService {
  private repository: Repository<Projects>;

  constructor(appDataSource: DataSource) {
    this.repository = appDataSource.manager.getRepository(Projects);
  }

  list = async (): Promise<Projects[]> => {
    const projects = await this.repository.find();
    await this.repository.findAndCount();
    console.log("projects", projects);
    return projects;
  };

  paginate = async (props: {
    page: number;
    size: number;
  }): Promise<Paginated<Projects>> => {
    const { page, size } = props;
    const pageSize = size || 5;
    const skip = ((page || 1) - 1) * pageSize;
    console.log("skip", skip);
    const paginatedProjects = await this.repository.findAndCount({
      take: pageSize,
      skip,
    });
    console.log(
      "🚀 ~ ProjectsService ~ paginate= ~ paginatedProjects:",
      paginatedProjects
    );
    return {
      data: paginatedProjects[0],
      totalItems: paginatedProjects[1],
      page,
      limit: size,
    };
  };

  add = async (res: Response, dto: ProjectsAddDto): Promise<Projects> => {
    let error: any[] = [];
    try {
      const payload = new ProjectsAddDto();
      Object.assign(payload, dto);
      const errors = await validate(payload);
      console.log("🚀 ~ ProjectsService ~ add= ~ errors:", errors);
      await each(errors, async (e) => {
        error.push(e.constraints);
      });
      if (error.length > 0) {
        throw new Error(JSON.stringify(error));
      }
      console.log("🚀 ~ ProjectsService ~ add= ~ errors:", errors);
      const { name, description } = payload;
      return await this.repository.save({ name, description });
    } catch (e) {
      console.error("error", e);
      if (has(e, "message")) {
        error.push({ other: e.message });
      }
    }
    return Promise.reject(error);
  };
}
