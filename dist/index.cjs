var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  authenticateApp: () => authenticateApp_default,
  checkApiKey: () => checkApiKey_default
});
module.exports = __toCommonJS(src_exports);

// src/redis/redis.ts
var ioredis = __toESM(require("ioredis"), 1);

// src/loadEnvironments.ts
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
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

// src/redis/getHash/getHash.ts
var getHash = async (targetApp, appToAuthenticate) => {
  const hash = await redis_default.hget(targetApp, appToAuthenticate);
  return hash;
};
var getHash_default = getHash;

// src/authenticateApp/authenticateApp.ts
var import_bcryptjs = __toESM(require("bcryptjs"), 1);
var authenticateApp = async (targetApp, appToAuthenticate, keyToAuthenticate) => {
  const hash = await getHash_default(targetApp, appToAuthenticate);
  if (!hash) {
    return false;
  }
  return import_bcryptjs.default.compare(keyToAuthenticate, hash);
};
var authenticateApp_default = authenticateApp;

// src/utils/requestHeaders.ts
var requestHeaders = {
  apiName: "X-API-NAME",
  apiKey: "X-API-KEY"
};
var requestHeaders_default = requestHeaders;

// src/checkApiKey/checkApiKey.ts
var checkApiKey = (targetApp) => async (req, res, next) => {
  const apiKey = req.get(requestHeaders_default.apiKey);
  const appToAuthenticate = req.get(requestHeaders_default.apiName);
  try {
    if (!await authenticateApp_default(targetApp, appToAuthenticate, apiKey)) {
      throw new Error("Invalid API key");
    }
    next();
  } catch (error) {
    error.statusCode = 401;
    error.publicMessage = error.message;
    next(error);
  }
};
var checkApiKey_default = checkApiKey;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticateApp,
  checkApiKey
});
