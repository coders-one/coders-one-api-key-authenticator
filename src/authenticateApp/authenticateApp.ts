import getApps from "../redis/getApps/getApps.js";
import bcrypt from "bcryptjs";

const authenticateApp = async (
  targetApp: string,
  keyToAuthenticate: string
): Promise<boolean> => {
  const apps = await getApps(targetApp);

  const hashes = Object.values(apps);

  if (!hashes.length) {
    return false;
  }

  const hashComparisons = hashes.map(async (hash) =>
    bcrypt.compare(keyToAuthenticate, hash)
  );

  return (await Promise.all(hashComparisons)).includes(true);
};

export default authenticateApp;
