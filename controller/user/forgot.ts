import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { UserModel } from "../../model/users.model";
import bcrypt from "bcrypt";
import { OptModel, Otp, OtpPopulated } from "../../model/otp.model";
export const sendOtp = async (request: Request, response: Response) => {
  const { email } = request.body;

  const isEmailExisted = await UserModel.findOne({ email });

  if (!isEmailExisted) {
    response.status(404).send({ message: "User not found " });
    return;
  }
  const verificationCode = Math.floor(1000 + Math.random() * 9000); //0-1*9000+100

  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com", //5
    port: 465,
    secure: true,
    auth: {
      user: "m.erdenesuwd2021@gmail.com",
      pass: "wojphsgkroauwdoi",
    },
  });

  const options = {
    from: '"m.erdenesuwd2021@gmail.com',
    to: email,
    subject: "Баталгаажуулах код:",
    html: `<div>Batalgajuulah code:<h2>${verificationCode}</h2  ></div>`,
  };

  try {
    await OptModel.create({
      code: verificationCode,
      userId: isEmailExisted._id,
    });
    await transport.sendMail(options);
    response
      .status(200)
      .send({ message: "Код амжилттай илгээгдлээ", code: verificationCode });
  } catch (err) {
    console.error("Илгээхэд алдаа:", err);
    response
      .status(500)
      .send({ message: "Код илгээхэд алдаа гарлаа", error: err });
  }
};
export const checkOtp = async (requist: Request, response: Response) => {
  const { code, email } = requist.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      response.status(400).send("User not found");
      return;
    }
    const isOtpExisting = await OptModel.findOne({
      code: code,
    }).populate<OtpPopulated>("userId");
    if (!isOtpExisting) {
      response.status(400).send("wrong code ");
      return;
    }

    if (email === isOtpExisting?.userId?.email) {
      response.status(200).send({ message: "success" });
      return;
    }
    response.status(400).send({ message: "Wrong code" });
    return;
  } catch (err) {
    response.status(400).send("wrong otp");
  }
};

export const updatePassword = async (requist: Request, response: Response) => {
  const { password, email } = requist.body;

  const isEmailExisted = await UserModel.findOne({ email });

  if (!isEmailExisted) {
    response.status(404).send({ message: "User not found " });
    return;
  }
  const hashedPAssword = await bcrypt.hashSync(password, 10);
  await UserModel.findOneAndUpdate({ email }, { password: hashedPAssword });
  response.send({ message: "Successfully updated password" });
};
