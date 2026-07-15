import bcrypt from "bcrypt";

export const hashPassword = async(password) => {
  try {
    const hsPass = await bcrypt.hash(password, 10);
    return hsPass;
  } catch(error) {
    console.log("Hashed Error", error);
  }
};


