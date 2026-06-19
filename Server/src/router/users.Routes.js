import express from "express";
import { deleteUser, getALLUsers, getUserById, updateUser, updateUserRole } from "../controller/user.Controller.js";


const route = express.Router()

route.get('/all-users',getALLUsers)

route.get("/user/:id", getUserById)

route.get("/user-email", getUserByEmail)

route.delete("/delete-user/:id", deleteUser);

route.put("/update-user/:id", updateUser);

route.put("/update-user-role/:id", updateUserRole);

export default route;
