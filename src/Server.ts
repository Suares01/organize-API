import "reflect-metadata";
import "@shared/container/index";
import "express-async-errors";
import bodyParser from "body-parser";
import config from "config";
import cors from "cors";
import expressPino from "express-pino-logger";
import * as http from "http";
import { serve, setup } from "swagger-ui-express";

import { Logger } from "@config/types";
import { errorHandler } from "@middleware/error/errorHandler";
import { internalErrorHandler } from "@middleware/error/internalErrorHandler";
import { mongooseErrorHandler } from "@middleware/error/mongooseErrorHandler";
import { ProjectsController } from "@modules/projects/controller/ProjectsController";
import { UsersController } from "@modules/users/controller/UsersController";
import { Server } from "@overnightjs/core";
import logger from "@shared/logger/logger";

import * as database from "./database/index";
import docs from "./docs/docs.openapi.json";

export class SetupServer extends Server {
  constructor(private port = config.get<number>("App.port")) {
    super();
  }

  private logConfig = config.get<Logger>("App.logger");

  private server?: http.Server;

  public async initServer(): Promise<void> {
    this.setupExpress();
    await this.setupDocs();
    this.setupControllers();
    await this.setupDatabase();
    this.setupErrorHandler();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(
      expressPino({
        enabled: this.logConfig.enabled,
        level: this.logConfig.level,
      })
    );
    this.app.use(
      cors({
        origin: "*",
      })
    );
  }

  private async setupDocs(): Promise<void> {
    this.app.use("/docs", serve, setup(docs));
  }

  private setupControllers(): void {
    this.addControllers([new UsersController(), new ProjectsController()]);
  }

  private async setupDatabase(): Promise<void> {
    await database.connect();
  }

  private setupErrorHandler(): void {
    this.app.use(mongooseErrorHandler);
    this.app.use(internalErrorHandler);
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
