export type Logger = {
  enabled: boolean;
  level: string;
};

export type App = {
  port: number;
  logger: Logger;
};
