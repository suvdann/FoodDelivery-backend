import { model, Schema } from "mongoose";
import { User } from "./users.model";
export type Otp={
    _id:Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    code:string;
    createdAt:Date;
}
export type OtpPopulated={
    userId:User;
}
 const Otp = new Schema<Otp>({
  code: { type: String, required: true },
  userId: { type: Schema.ObjectId, required: true, ref: "Users" },

  createdAt: { type: Date, default: Date.now, expires: 90 },
});
export const OptModel = model<Otp>("Otp", Otp);