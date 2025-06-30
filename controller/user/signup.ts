import { Request, Response } from "express";
import { UserModel } from "../../model/users.model";
import bcrypt from "bcrypt";
export const signUp = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  console.log(request.body);
  const isEmailExisted = await UserModel.findOne({ email });
  // console.log(isEmailExisted);

  if (!isEmailExisted) {
    const hashedPAssword = await bcrypt.hashSync(password, 10);
    await UserModel.create({ email, password: hashedPAssword });
    response.send({ message: "Successfully registered" });
    return;
  }

  response.status(400).send({ message: "User already existed" });
};
