import redis from "../redis.js";

const getApps = async (targetApp: string): Promise<Record<string, string>> => {
  const apps = await redis.get(targetApp);

  return apps ? (JSON.parse(apps) as Record<string, string>) : {};
};

export default getApps;
