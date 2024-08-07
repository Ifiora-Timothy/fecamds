"use server";

import dbConnect from "../dbConnect";
import { signUpInputs, user } from "../models/user";

export const signUp = async (data: signUpInputs) => {
  try {
    await dbConnect();
    //@ts-ignore
    await user.createUser(data);
  } catch (err) {
    throw err;
  }
};
export const logIn = async (email: string) => {
  try {
    await dbConnect();
    //@ts-ignore
    const resp: signUpInputs = await user.validateLogin(email);
    return resp;
  } catch (err) {
    throw err;
  }
};
