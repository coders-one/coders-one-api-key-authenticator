// src/redis/redis.ts
import * as ioredis from "ioredis";

// src/loadEnvironments.ts
import dotenv from "dotenv";
dotenv.config();
var {
  REDIS_HOST: host,
  REDIS_PORT: port,
  REDIS_PASSWORD: password
} = process.env;
var environment = {
  redis: {
    host,
    port: +port,
    password
  }
};

// src/redis/redis.ts
var { default: Redis } = ioredis;
var {
  redis: { host: host2, password: password2, port: port2 }
} = environment;
var redis = new Redis({ host: host2, password: password2, port: port2 });
var redis_default = redis;

// src/redis/getApps/getApps.ts
var getApps = async (targetApp) => {
  const apps = await redis_default.get(targetApp);
  return apps ? JSON.parse(apps) : {};
};
var getApps_default = getApps;

// src/authenticateApp/authenticateApp.ts
import bcrypt from "bcryptjs";
var authenticateApp = async (targetApp, keyToAuthenticate) => {
  const apps = await getApps_default(targetApp);
  const hashes = Object.values(apps);
  if (!hashes.length) {
    return false;
  }
  const hashComparisons = hashes.map(
    async (hash) => bcrypt.compare(keyToAuthenticate, hash)
  );
  return (await Promise.all(hashComparisons)).includes(true);
};
var authenticateApp_default = authenticateApp;

// src/checkApiKey/checkApiKey.ts
var checkApiKey = (targetApp) => async (req, res, next) => {
  const apiKeyHeader = "X-API-KEY";
  const apiKey = req.get(apiKeyHeader);
  try {
    if (!await authenticateApp_default(targetApp, apiKey)) {
      throw new Error("Invalid API Key");
    }
    next();
  } catch (error) {
    error.statusCode = 401;
    error.publicMessage = "Invalid API Key";
    next(error);
  }
};
var checkApiKey_default = checkApiKey;
export {
  authenticateApp_default as authenticateApp,
  checkApiKey_default as checkApiKey
};
