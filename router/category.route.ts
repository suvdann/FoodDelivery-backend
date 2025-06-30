import {Router}from"express"

import { tokenChecker } from "../middleware/token-checker"
import { createCategory } from "../controller/category/create-category"
import { getCategories } from "../controller/category/get-categories"




export const CategorRouter=Router()

    
CategorRouter.post("/addCategory", tokenChecker,createCategory)
CategorRouter.get("/categories", getCategories)
