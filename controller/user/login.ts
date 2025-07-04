import { Request, Response } from "express";
import { UserModel } from "../../model/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const login = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const isEmailExisted = await UserModel.findOne({ email });

    if (!isEmailExisted) {
      response.status(400).send({ message: "email or password not matching" });
      return;
    } else {
      const hashedPAssword = await bcrypt.compareSync(
        password,
        isEmailExisted?.password
      );

      //token uusgeh, tokendoo userid gaa damjuulsn
      if (hashedPAssword) {
        const tokenPassword = "foodDelivery";
        const token = jwt.sign(
          {
            userId: isEmailExisted._id,
            isAdmin: isEmailExisted.role === "ADMIN" ? true : false,
          },
          tokenPassword
        );
        response.send({ message: "Successfully logged in", token: token });
        return;
      } else {
        response
          .status(404)
          .send({ message: "email or password not matching " });
        return;
      }
    }
  } catch (err) {
    response.status(401).send({ message: "jjjjjjjjjjjjjjjjjj" });
  }
};
