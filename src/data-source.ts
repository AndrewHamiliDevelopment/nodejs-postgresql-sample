import "reflect-metadata";
import { DataSource } from "typeorm";
import { Projects } from "./entity/projects";
import { isEmpty } from "lodash";
import * as dotenv from 'dotenv';
import { User } from "./entity/User";

dotenv.config();

const configs = [
  "DATABASE_HOST",
  "DATABASE_PORT",
  "DATABASE_USER",
  "DATABASE_PASS",
  "DATABASE_NAME",
];

configs.forEach((c) => {
    if(isEmpty(process.env[c])) {
        throw new Error(`Configuration ${c} is not set`);
    }
});

const host = process.env.DATABASE_HOST;
const port = Number(process.env.DATABASE_PORT);
const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASS;
const database = process.env.DATABASE_NAME;
const logging = Boolean(process.env.DATABASE_LOGGING);

console.log('DB Configuration', {host, port, username, password, database, logging});
export const AppDataSource = new DataSource({
  type: "postgres",
  host,
  port,
  username,
  password,
  database,
  synchronize: false,
  logging,
  logger: "advanced-console",
  entities: [Projects, User],
  migrations: [__dirname + '/migration/*.ts'],
  subscribers: [],
});
