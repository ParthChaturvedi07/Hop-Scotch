import userModel from "../models/user.model.js";

export const createUser = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !email || !password) {
    throw new Error("Missing required fields");
  }
  const newUser = await userModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
  });

  return newUser;
};
