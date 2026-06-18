import express from "express";
import { getALLUsers } from "../controller/user.Controller.js";


const route = express.Router()

route.get('/all-users',getALLUsers)






export default route;
