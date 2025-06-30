import { Request, Response } from "express";
import { CategoryModel } from "../../model/category.model";

export const createCategory = async (req: Request, res: Response) => {
  const { categoryName } = req.body;
  try {
    await CategoryModel.create({ categoryName });
    res.status(200).send({ message: " successfully created category" });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "category ner dawhardah bolomjgui" });
  }
};
