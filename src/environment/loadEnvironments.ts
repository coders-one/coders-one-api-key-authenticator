import dotenv from "dotenv";
import envSchema from "./schema";

dotenv.config();

const {
  REDIS_HOST: host,
  REDIS_PORT: port,
  REDIS_PASSWORD: password,
} = process.env;

const envValidationResult = envSchema.validate(process.env);

if (envValidationResult.error) {
  console.error("\u001b[31mMissing environmental variables\u001b[0m");
  console.error(`\u001b[31m${envValidationResult.error.message}\u001b[0m`);
  process.exit(1);
}

export const environment = {
  redis: {
    host,
    port: +port!,
    password,
  },
};
