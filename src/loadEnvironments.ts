import dotenv from "dotenv";

dotenv.config();

const {
  REDIS_HOST: host,
  REDIS_PORT: port,
  REDIS_PASSWORD: password,
} = process.env;

export const environment = {
  redis: {
    host,
    port: +port,
    password,
  },
};
