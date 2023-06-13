/* eslint-disable @typescript-eslint/naming-convention */
import Joi from "joi";

const envSchema = Joi.object({
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().required(),
}).unknown();

export default envSchema;
