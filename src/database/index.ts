import config from "config";
import mongoose, { Mongoose } from "mongoose";

import { Database } from "@config/types";
import logger from "@shared/logger/logger";

const database = config.get<Database>("App.database");

mongoose.connection.on("error", (error) =>
  logger.error(`Database error: ${error}`)
);

mongoose.connection.on("open", () => logger.info("Database connected"));

mongoose.connection.on("disconnected", () =>
  logger.info("Database disconnected")
);

export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect(database.uri);

export const disconnect = async (): Promise<void> => {
  await mongoose.connection.close();
};
