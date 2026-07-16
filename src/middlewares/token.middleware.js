import jwt from "jsonwebtoken";

const key = process.env.JWT_SECRET_KEY;

export const generateToken = async (uniqueId, role) => {
  const token = await jwt.sign(
    {
      id: uniqueId,
      role: role,
    },
    key,
    {
      expiresIn: "7d",
    },
  );
  return token;
};

export const verifyToken = async (token) => {
  const data = await jwt.verify(token, key);
  return data;
};
