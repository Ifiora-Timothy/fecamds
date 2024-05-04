import { department } from "@/app/signup/page";
import mongoose, { Model } from "mongoose";
import validator from "validator";

export interface Users extends mongoose.Document {
  username: string;
  email: string;
  department: department;
  daysSubmitted?: Array<Date>;
}
interface loginUser extends mongoose.Document {
  email: string;
}
interface userModel extends Model<Users> {
  createUser(data: signUpInputs): Promise<Users>;
}
interface loginModel extends Model<Users> {
  validateLogin(data: Users): { email: string; id: string };
}

const validateEmail = async (email: string) => {
  if (!email) {
    throw new Error("Please provide your email");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Please provide a valid email");
  }
  return true;
};
/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<Users, userModel>(
  {
    username: {
      type: String,
      required: [true, "Please provide a username."],
      maxlength: [20, "Name cannot be more than 20 characters"],
    },
    email: {
      unique: true,
      type: String,
      required: [true, "Please provide your email"],
      maxlength: [60, "email cannot be more than 60 characters"],
    },

    department: {
      /* The species of your pet */
      type: String,
      enum: ["medicine", "dentistry"],
      required: [true, "Please specify the species of your pet."],
    },
    daysSubmitted: {
      type: [Date],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export type signUpInputs = {
  username: string;
  email: string;
  department: department;
};

UserSchema.statics.createUser = async function (data: signUpInputs) {
  try {
    const { username, email, department } = data;
    //if it does not exist thrug a trpc error
    if (!email) {
      throw new Error("Please provide all the required fields");
    }
    await validateEmail(email);

    //check if the email or username already exists
    const emailExist = await this.findOne({ email });
    if (emailExist) {
      throw new Error("Email already exists");
    }
    //TODO: SET UP JWT TOKEN

    const user = await this.create({
      username,
      email,
      department,
    });

    return user;
  } catch (err) {
    throw err;
  }
};

UserSchema.statics.validateLogin = async function (email: string) {
  //if it does not exist thrug a trpc error

  const validate = await validateEmail(email);
  if (!validate) {
    throw new Error("invalid email");
  }
  //check if the email or username already exists

  const emailExist = await this.findOne({ email });
  if (!emailExist) {
    throw new Error("Email does not exist");
  }

  const user = {
    username: emailExist.username,
    email: emailExist.email,
    department: emailExist.department,
  };
  return user;
};

UserSchema.statics.findByEmailAndUsername = async function ({
  email,
  username,
}: {
  email: string;
  username: string;
}) {
  const emailExist = await this.findOne({ email });
  if (!emailExist) {
    return new Error("Email does not exist");
  }

  //check if username match
  if (!(username === emailExist.username)) {
    throw new Error("username does not match");
  }

  return { success: true };
};

//export const user = mongoose.model<Users, userModel>("User", UserSchema);
export const user =
  mongoose.models.User<userModel> ||
  mongoose.model<Users, userModel>("User", UserSchema);
