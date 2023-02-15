import getApps from "../redis/getApps/getApps.js";
import bcrypt from "bcryptjs";

const authenticateApp = async (
  targetApp: string,
  appToAuthenticate: string,
  keyToAuthenticate: string
): Promise<boolean> => {
  const apps = await getApps(targetApp);

  const hash = apps[appToAuthenticate];

  if (!hash) {
    return false;
  }

  return bcrypt.compare(keyToAuthenticate, hash);
};

export default authenticateApp;
