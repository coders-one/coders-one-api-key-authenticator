import getApps from "../redis/getApps/getApps.js";

const authenticateApp = async (
  targetApp: string,
  appToAuthenticate: string,
  hashToAuthenticate: string
): Promise<boolean> => {
  const apps = await getApps(targetApp);

  const hash = apps[appToAuthenticate];

  if (!hash) {
    return false;
  }

  return hash === hashToAuthenticate;
};

export default authenticateApp;
