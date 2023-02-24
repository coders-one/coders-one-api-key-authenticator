import getHash from "../redis/getHash/getHash.js";
import bcrypt from "bcryptjs";

const authenticateApp = async (
  targetApp: string,
  appToAuthenticate: string,
  keyToAuthenticate: string
): Promise<boolean> => {
  const hash = await getHash(targetApp, appToAuthenticate);

  if (!hash) {
    return false;
  }

  return bcrypt.compare(keyToAuthenticate, hash);
};

export default authenticateApp;
