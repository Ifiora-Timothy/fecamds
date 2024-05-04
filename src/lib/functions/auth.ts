"use server";

import { Users, signUpInputs, user } from "../models/user";
import { addToLocalStrorage } from "./function";

export const signUp = async (data: signUpInputs) => {
  try {
    //@ts-ignore
    await user.createUser(data);
  } catch (err) {
    throw err;
  }
};
export const logIn = async (email: string) => {
  try {
    //@ts-ignore
    const resp: signUpInputs = await user.validateLogin(email);
    return resp;
  } catch (err) {
    throw err;
  }
};
