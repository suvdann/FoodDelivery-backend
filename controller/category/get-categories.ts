import { Request, Response } from "express";
import { CategoryModel } from "../../model/category.model";

export const getCategories=async(_req:Request, res:Response)=>{
try{
    const allCategories=await CategoryModel.find();
    res.send({categories:allCategories})
}catch(err){
    res.status(400).send({message:"Database holboltond aldaa garsan"})
}
}