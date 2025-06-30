import { Request, Response } from "express";
import { FoodModel } from "../../model/food.model";

export const addFood = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingredients, category } = req.body;
    await FoodModel.create({
      foodName,
      price,
      image,
      ingredients,
      category,
    });
    res.status(200).send({ message: "Hool amjilttai nemegdlee" });
  } catch (err) {
    console.error("Алдаа:", err);
    res
      .status(400)
      .send({ message: "hoolnii ner dawahtsaj bolohgui", error: err });
  }
};

// import { Request, Response } from "express";
// import { FoodModel } from "../../model/food.model";

// export const addFood=async (req: Request, res: Response) => {

//   try {
//     const { foodName, price, image, ingredients, category } = req.body;
//      await FoodModel.create({
//       foodName,
//       price,
//       image,
//       ingredients,
//       category,
//     });
//     res.status(200).send({ message: "Hool amjilttai nemegdlee" });
//   } catch (err) {
//     console.error("Алдаа:", err);
//     res.status(400).send({ message: "hoolnii ner dawahtsaj bolohgui", error: err });
//   }
// };
