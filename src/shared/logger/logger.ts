import config from "config";
import pino from "pino";

import { Logger } from "@config/types";

const logger = config.get<Logger>("App.logger");

export default pino<Logger>({
  enabled: logger.enabled,
  level: logger.level,
});
