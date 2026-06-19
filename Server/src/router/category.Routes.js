import express from "express"
import { createcategory, deleteCategory, getALLcategories, updateCategory } from "../controller/category.Controller.js"

const route=express.Router()






route.post('/create-category',createcategory)
route.get('/all-category',getALLcategories)
route.put('/update-category/:id',updateCategory)
route.delete('/delete-category/:id', deleteCategory);



export default route 