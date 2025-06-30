import { Router } from "express";

import { tokenChecker } from "../middleware/token-checker";
import { addFood } from "../controller/food/add-food";
import { getFoodCategory } from "../controller/food/get-foods-by-category";

export const FoodRouter = Router();

FoodRouter.post("/addfood", addFood);
FoodRouter.get("/foods", getFoodCategory);
