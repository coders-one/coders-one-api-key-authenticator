// src/redis/redis.ts
import Redis from "ioredis";

// src/loadEnvironments.ts
import dotenv from "dotenv";
dotenv.config();
var {
  REDIS_HOST: host,
  REDIS_PORT: port,
  REDIS_PASSWORD: password,
} = process.env;
var environment = {
  redis: {
    host,
    port: +port,
    password,
  },
};

// src/redis/redis.ts
var {
  redis: { host: host2, password: password2, port: port2 },
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
var authenticateApp = async (
  targetApp,
  appToAuthenticate,
  hashToAuthenticate
) => {
  const apps = await getApps_default(targetApp);
  const hash = apps[appToAuthenticate];
  if (!hash) {
    return false;
  }
  return hash === hashToAuthenticate;
};
var authenticateApp_default = authenticateApp;

// src/checkApiKey/checkApiKey.ts
var checkApiKey = (targetApp, appToAuthenticate) => async (req, res, next) => {
  const apiKeyHeader = "X-API-KEY";
  const apiKey = req.get(apiKeyHeader);
  try {
    if (
      !(await authenticateApp_default(targetApp, appToAuthenticate, apiKey))
    ) {
      throw new Error("Invalid API key");
    }
    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};
var checkApiKey_default = checkApiKey;
export {
  authenticateApp_default as authenticateApp,
  checkApiKey_default as checkApiKey,
};
