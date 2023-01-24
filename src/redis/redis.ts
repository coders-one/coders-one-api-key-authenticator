import Redis from "ioredis";
import { environment } from "../loadEnvironments.js";

const {
  redis: { host, password, port },
} = environment;

const redis = new Redis({ host, password, port });

export default redis;
