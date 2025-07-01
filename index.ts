import express, { request, Request, Response } from "express";
import mongoose, { connect, Schema, model } from "mongoose";
import bcrypt, { hash } from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { UserRouter } from "./router/user.router";
import { CategorRouter } from "./router/category.route";
import { FoodRouter } from "./router/food.route";
import { getOrderByUserId } from "./controller/order/get-order-by-userId";
import { OrderRouter } from "./router/order.route";
import { AdminRouter } from "./router/admin.route";
const app = express(); //
app.use(cors());
app.use(express.json());

const databaseConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://merdenesuwd2021:89866282@cluster0.cbgfjcq.mongodb.net/foodDelivery"
    );
    console.log("Database Successfully  connected");
  } catch (err) {
    console.log(err);
    throw new Error("Data base assangui");
  }
};
databaseConnect();

app.use(UserRouter);
app.use(CategorRouter);
app.use(FoodRouter);
app.use(OrderRouter);
app.use(AdminRouter);
app.listen(8000, () => {
  console.log("running on http://localhost:8000");
});
