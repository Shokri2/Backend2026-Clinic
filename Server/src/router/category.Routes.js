import express from "express"
import { createcategory, deleteCategory, getALLcategories, updateCategory } from "../controller/category.Controller.js"
import { protect } from "../middleware/protect.Middleware.js"

const route=express.Router()






route.post('/create-category',protect,adminOnly, createcategory)
route.get('/all-category',getALLcategories)
route.put("/update-category/:id", protect, adminOnly, updateCategory);
route.delete("/delete-category/:id", protect, adminOnly, deleteCategory);



export default route 