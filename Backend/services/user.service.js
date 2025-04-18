const userModel = require("../models/user.model");

module.exports.CreateUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const NewUser = await userModel.create({
    email,
    password,
  });
  return NewUser;
};
