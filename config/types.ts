export type Logger = {
  enabled: boolean;
  level: string;
};

export type Database = {
  uri: string;
};

export type App = {
  port: number;
  database: Database;
  logger: Logger;
};
