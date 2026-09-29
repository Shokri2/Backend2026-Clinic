import User from "../model/auth.Model.js";
import Doctor from "../model/doctor.Model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// =====================================================
// REGISTER
// =====================================================

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "please fill all fields",
      });
    }

    if (name.length < 3) {
      return res.status(400).json({
        message: "name should be more than 3 char",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "password not match",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "password must be at least 6 characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "email should be valid email",
      });
    }

    const isExist = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (isExist) {
      return res.status(400).json({
        message: "email already exist",
      });
    }

    const hash_password = await bcrypt.hash(password, 10);

    // التسجيل العادي يبقى User
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      hash_password,
      role: "user",
    });

    return res.status(201).json({
      message: "created account",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "internel server error",
    });
  }
};

// =====================================================
// LOGIN
// =====================================================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "faill all requierd field",
      });
    }

    // Find User
    const isExist = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!isExist) {
      return res.status(400).json({
        message: "user not register",
      });
    }

    // Check Password
    const ismatch = await bcrypt.compare(password, isExist.hash_password);

    if (!ismatch) {
      return res.status(400).json({
        message: "email or passowrd are incorrect",
      });
    }

    // =================================================
    // GET DOCTOR ID
    // =================================================

    let doctorId = null;

    if (isExist.role === "doctor") {
      const doctor = await Doctor.findOne({
        user: isExist._id,
      });

      if (!doctor) {
        return res.status(404).json({
          message: "Doctor profile not found",
        });
      }

      doctorId = doctor._id;
    }

    // =================================================
    // JWT
    // =================================================

    const token = jwt.sign(
      {
        name: isExist.name,
        email: isExist.email,
        role: isExist.role,
        createdAT: isExist.createdAT,
        id: isExist._id,

        // Doctor ID داخل التوكن
        doctorId: doctorId,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "30m",
      },
    );

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      message: "login succsesful",

      user: {
        name: isExist.name,
        email: isExist.email,
        role: isExist.role,
        createdAT: isExist.createdAT,
        id: isExist._id,

        // للـDoctor فقط
        doctorId: doctorId,
      },

      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "internel server error",
    });
  }
};
