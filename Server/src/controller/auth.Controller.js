import User from "../model/auth.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// crud
//create-read-update-delete

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;
    if (!name || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: "please fill all fields" });
      //bad req 400
    }
    //check name validate
    if (name.length > 3) {
      return res
        .status(400)
        .json({ message: "name should be mor than 3 char" });
    }
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "password not match" });
    }
    //check password validate
    if (passRegex.test(password)) {
      return res.status(400).json({
        message: "password must contain uppercase and lowercase latters",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "email should be valid email" });
    }

    //check email
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({ message: "email already exist" });
    }
    const hash_password = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, hash_password });
    return res.status(201).json({ message: "created account", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internel server error",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //input= req.body
    //validation
    if (!email || !password) {
      return res.status(400).json({
        message: "faill all requierd field",
      });
    }
    const isExist = await User.findOne({ email });
    if (!isExist) {
      return res.status(400).json({
        message: "user not register",
      });
    }
    const ismatch = await bcrypt.compare(password, isExist.hash_password);

    if (!ismatch) {
      return res.status(400).json({
        message: "email or passowrd are incorrect",
      });
    }
    //generate token
    const token = jwt.sign(
      {
        name: isExist.name,
        email: isExist.email,
        role: isExist.role,
        createdAT: isExist.createdAT,
        id: isExist._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" },
    );
    return res.status(200).json({
      message: "login succsesful",
      user: {
        name: isExist.name,
        email: isExist.email,
        role: isExist.role,
        createdAT: isExist.createdAT,
        id: isExist._id,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internel server error",
    });
  }
};
