import bcrypt from "bcrypt";

export const hashPassword = async(password) => {
  try {
    const hsPass = await bcrypt.hash(password, 10);
    return hsPass;
  } catch(error) {
    console.log("Hashed Error", error);
  }
};


export const passwordChecker = async(password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log("Password check error",error)
  }
}