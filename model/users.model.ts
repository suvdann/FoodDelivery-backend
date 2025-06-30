import { model, Schema } from "mongoose";
export enum UserRoleEnum { //
  USER = "USER",
  ADMIN = "ADMIN",
}
export type User = {
  email: string;
  password: string;

  // role?: UserRoleEnum;
  role?: string;

  phoneNumber?: number; //? baihgui baij bolno
  address?: string;

  isVerified?: Boolean;
  createdAt: Date;
  updateAt: Date;
};
const Users = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },

  phoneNumber: { type: String, required: false },
  address: { type: String, required: false },
  role: {
    type: String,
    // enum: ["USER, ADMIN"],
    required: true,
    default: "USER",
  }, //USER ADMIN hoyroos oor string awahgui

  isVerified: { type: Boolean, required: false },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updateAt: { type: Date, default: Date.now },
});
Users.index({ email: 1 }, { unique: true });
export const UserModel = model<User>("Users", Users);
