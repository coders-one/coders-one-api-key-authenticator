import dotenv from "dotenv";

dotenv.config();

const {
  REDIS_HOST: host,
  REDIS_PORT: port,
  REDIS_PASSWORD: password,
} = process.env;

if (!port || !password || !host) {
  console.error("Missing environmental variables");
  process.exit(1);
}

export const environment = {
  redis: {
    host,
    port: +port,
    password,
  },
};
