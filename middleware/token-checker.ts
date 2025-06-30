import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const tokenChecker = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.headers.authorization;
  if (!authorization) {
    response.status(401).send({ message: "Please log in" });
    return;
  }
  const token = authorization.split(" ")[1];
  const tokenPassword = "foodDelivery";
  try {
    const isValid = jwt.verify(token, tokenPassword);
    console.log(token);
    if (isValid) {
      const destructToken: any = jwt.decode(token);

      //   response.send({ destructToken });
      response.locals.userId = destructToken.userId;
      next();
      console.log({ destructToken });
      return;
    } else {
      response.status(401).send({ message: "token is not valid" });
      return;
    }
  } catch (err) {
    response.status(401).send({ message: "Error " });
    return;
  }
};
