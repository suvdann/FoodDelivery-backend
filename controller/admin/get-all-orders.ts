import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/order.model";

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const allOrders = await FoodOrderModel.find({})

      .populate({
        path: "foodOrderItems",
        populate: {
          path: "food",
          model: "Foods",
        },
      })
      .populate("user");

    res.status(200).send({ orders: allOrders });
  } catch (err) {
    res.status(400).send({ message: "getAllOrders error" });
  }
};
