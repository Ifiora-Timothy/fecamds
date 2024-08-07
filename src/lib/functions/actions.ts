"use server";

import dbConnect from "../dbConnect";
import { user } from "../models/user";

export const getLastSubmissionDate = async (email: string) => {
  try {
    if (!email) {
      return JSON.stringify(Error("Email is required"));
    }
    await dbConnect();
    const userInfo = await user.findOne({ email }).sort({ daysSubmitted: 1 });
    if (!userInfo) return JSON.stringify(new Error("User not found"));
    return JSON.stringify(userInfo.daysSubmitted);
  } catch (err: any) {
    return JSON.stringify(new Error(err.message));
  }
};
export const updateLastSubmissionDate = async (email: string) => {
  try {
    await dbConnect();

    await user.findOneAndUpdate(
      { email },
      { $push: { daysSubmitted: new Date() } }
    );

    return "success";
  } catch (err) {
    throw err;
  }
};
export const checkIfUserExists = async (email: string) => {
  try {
    await dbConnect();
    const userExists = await user.findOne({
      email,
    });

    return userExists ? true : false;
  } catch (err) {
    return false;
  }
};

export const getAllFields = async (email: string) => {
  try {
    await dbConnect();
    const details = await user.find({}, "daysSubmitted");
    return JSON.stringify(details);
  } catch (err) {
    return null;
  }
};
