import * as ioredis from "ioredis";
import { environment } from "../environment/loadEnvironments.js";

// eslint-disable-next-line @typescript-eslint/naming-convention
const { default: Redis } = ioredis;

const {
  redis: { host, password, port },
} = environment;

const redis = new Redis({ host, password, port });

export default redis;
