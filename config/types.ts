export type Logger = {
  enabled: boolean;
  level: string;
};

export type Database = {
  uri: string;
};

export type Auth = {
  secret: string;
};

export type App = {
  port: number;
  database: Database;
  auth: Auth;
  logger: Logger;
};
