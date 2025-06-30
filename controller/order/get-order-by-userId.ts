import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/order.model";
export const getOrderByUserId = async (_req: Request, res: Response) => {
  const { userId } = res.locals;
  try {
    const allOrderByUserId = await FoodOrderModel.find({
      user: userId,
    }).populate({
      path: "foodOrderItems",
      populate: {
        path: "food",
        model: "Foods",
      },
    });
    res.status(200).send({ orders: allOrderByUserId });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Cannot get order" });
  }
};
