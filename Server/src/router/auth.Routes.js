import express from "express";
import { register } from "../controller/auth.Controller.js";


const route = express.Router()

route.post('/auth/register',register)









export default route;
