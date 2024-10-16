import bcrypt from "bcrypt";
export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}
export async function comparePassword(plainPassword, hashedPassword) {
    try {
      const result = await bcrypt.compare(plainPassword, hashedPassword);
      return result;
    } catch (error) {
      console.error("Error comparing password:", error);
      throw error;
    }
  }
  export const isValidUUID = (uuid)=> {
  const UUID_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return UUID_REGEX.test(uuid)
  };