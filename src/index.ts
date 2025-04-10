import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import * as express from 'express';
import * as dotenv from 'dotenv';
import { MainRouter } from "./routers/router";
import { isEmpty } from "lodash";
import bodyParser = require("body-parser");

dotenv.config()

const configs = [
  'SERVER_PORT',
  'DATABASE_HOST',
  'DATABASE_POST',
  'DATABASE_USER',
  'DATABASE_PASS',
  'DATABASE_NAME',
  'DATABASE_LOGGING',
  'SECRET',
];

configs.forEach((c) => {
    if (isEmpty(process.env[c])) {
      throw new Error(`ENV Variable "${c}" not set`);
    }
  });
  
  const port = Number(process.env.SERVER_PORT);

AppDataSource.initialize().then(async () => {

    const app = express();
    const router = new MainRouter(AppDataSource);

    app.use(bodyParser.json())

    app.use("/api", router.getRouter());

    app.listen(port, () => {
        console.log(`App started on port ${port}`);
    });

}).catch(error => console.log(error))
