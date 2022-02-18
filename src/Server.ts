import bodyParser from "body-parser";
import config from "config";
import expressPino from "express-pino-logger";
import * as http from "http";

import { Logger } from "@config/types";
import { Server } from "@overnightjs/core";

import logger from "./logger/logger";

export class SetupServer extends Server {
  constructor(private port = config.get<number>("App.port")) {
    super();
  }

  private logConfig = config.get<Logger>("App.logger");

  private server?: http.Server;

  public async initServer(): Promise<void> {
    this.setupExpress();
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

  public start(): void {
    process.send?.("ready");

    this.app.listen(this.port, () => {
      logger.info(`Server is running on port ${this.port}`);
    });
  }

  public async close(): Promise<void> {
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
