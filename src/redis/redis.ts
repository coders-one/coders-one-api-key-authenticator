import Redis from "ioredis";
import { environment } from "../loadEnvironments";

const {
  redis: { host, password, port },
} = environment;

const redis = new Redis({ host, password, port });

export default redis;
