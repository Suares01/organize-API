import "reflect-metadata";
import "@src/shared/container/index";
import "express-async-errors";
import bodyParser from "body-parser";
import config from "config";
import expressPino from "express-pino-logger";
import * as http from "http";

import { Logger } from "@config/types";
import { Server } from "@overnightjs/core";

import * as database from "./database/index";
import logger from "./logger/logger";
import { errorHandler } from "./middleware/error/errorHandler";
import { mongooseErrorHandler } from "./middleware/error/mongooseErrorHandler";
import { UsersController } from "./modules/users/controller/UsersController";

export class SetupServer extends Server {
  constructor(private port = config.get<number>("App.port")) {
    super();
  }

  private logConfig = config.get<Logger>("App.logger");

  private server?: http.Server;

  public async initServer(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.setupDatabase();
    this.setupErrorHandler();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(
      expressPino({
        enabled: this.logConfig.enabled,
        level: this.logConfig.level,
      })
    );
  }

  private setupControllers(): void {
    this.addControllers([new UsersController()]);
  }

  private async setupDatabase(): Promise<void> {
    await database.connect();
  }

  private setupErrorHandler(): void {
    this.app.use(mongooseErrorHandler);
    this.app.use(errorHandler);
  }

  public start(): void {
    process.send?.("ready");

    this.app.listen(this.port, () => {
      logger.info(`Server is running on port ${this.port}`);
    });
  }

  public async close(): Promise<void> {
    await database.disconnect();

    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((error) => {
          if (error) return reject(error);

          return resolve(true);
        });
      });
    }
  }
}
