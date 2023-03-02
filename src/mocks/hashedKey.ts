import bcrypt from "bcryptjs";

const hashedKey = bcrypt.hashSync("key", 10);

export default hashedKey;
