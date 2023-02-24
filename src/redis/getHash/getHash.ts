import redis from "../redis.js";

const getHash = async (
  targetApp: string,
  appToAuthenticate: string
): Promise<string> => {
  const hash = await redis.hget(targetApp, appToAuthenticate);

  return hash;
};

export default getHash;
