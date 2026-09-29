import Doctor from "../model/doctor.Model.js";
import User from "../model/auth.Model.js";
import bcrypt from "bcrypt";
import Appointment from "../model/appointment.Model.js";

// =====================================================
// GET ALL DOCTORS
// =====================================================

export const getDoctors = async (req, res) => {
  try {
    const { search, department } = req.query;

    let filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (department) {
      filter.department = department;
    }

    const doctors = await Doctor.find(filter).populate(
      "user",
      "-hash_password",
    );

    return res.status(200).json(doctors);
  } catch (error) {
    console.error("GET DOCTORS ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// =====================================================
// GET DOCTOR BY ID
// =====================================================

export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "user",
      "-hash_password",
    );

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    return res.status(200).json(doctor);
  } catch (error) {
    console.error("GET DOCTOR ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// =====================================================
// CREATE DOCTOR
// =====================================================

export const createDoctor = async (req, res) => {
  try {
    const { name, email, department, experience, price, image, about } =
      req.body;

    // =================================================
    // VALIDATION
    // =================================================

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Doctor name is required",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (!department || !department.trim()) {
      return res.status(400).json({
        message: "Department is required",
      });
    }

    if (experience === undefined || experience === null || experience === "") {
      return res.status(400).json({
        message: "Experience is required",
      });
    }

    // =================================================
    // PRICE VALIDATION
    // =================================================

    if (price === undefined || price === null || price === "") {
      return res.status(400).json({
        message: "Price is required",
      });
    }

    if (Number(price) < 20 || Number(price) > 50) {
      return res.status(400).json({
        message: "Doctor price must be between 20 and 50",
      });
    }

    // =================================================
    // EMAIL VALIDATION
    // =================================================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // =================================================
    // CHECK EMAIL
    // =================================================

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email is already used",
      });
    }

    // =================================================
    // DEFAULT DOCTOR PASSWORD
    // =================================================

    const DEFAULT_DOCTOR_PASSWORD = "Doctor123";

    const hashedPassword = await bcrypt.hash(DEFAULT_DOCTOR_PASSWORD, 10);

    // =================================================
    // CREATE USER ACCOUNT
    // =================================================

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      hash_password: hashedPassword,
      role: "doctor",
    });

    // =================================================
    // CREATE DOCTOR
    // =================================================

    try {
      const doctor = await Doctor.create({
        user: user._id,
        name: name.trim(),
        department: department.trim(),
        experience: Number(experience),
        price: Number(price),
        image,
        about,
      });

      // =================================================
      // POPULATE USER
      // =================================================

      const populatedDoctor = await Doctor.findById(doctor._id).populate(
        "user",
        "-hash_password",
      );

      return res.status(201).json({
        message: "Doctor created successfully",

        doctor: populatedDoctor,

        login: {
          email: normalizedEmail,
          password: DEFAULT_DOCTOR_PASSWORD,
        },
      });
    } catch (doctorError) {
      // If creating the doctor fails,
      // delete the user account that was created
      await User.findByIdAndDelete(user._id);

      throw doctorError;
    }
  } catch (error) {
    console.error("CREATE DOCTOR ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE DOCTOR
// =====================================================

export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      password,
      department,
      experience,
      price,
      image,
      about,
    } = req.body;

    // =================================================
    // FIND DOCTOR
    // =================================================

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    // =================================================
    // UPDATE DOCTOR DATA
    // =================================================

    const updateDoctorData = {};

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          message: "Doctor name cannot be empty",
        });
      }

      updateDoctorData.name = name.trim();
    }

    if (department !== undefined) {
      if (!department.trim()) {
        return res.status(400).json({
          message: "Department cannot be empty",
        });
      }

      updateDoctorData.department = department.trim();
    }

    if (experience !== undefined) {
      if (Number(experience) < 0) {
        return res.status(400).json({
          message: "Experience cannot be negative",
        });
      }

      updateDoctorData.experience = Number(experience);
    }

    // =================================================
    // UPDATE PRICE
    // =================================================

    if (price !== undefined) {
      if (Number(price) < 20 || Number(price) > 50) {
        return res.status(400).json({
          message: "Doctor price must be between 20 and 50",
        });
      }

      updateDoctorData.price = Number(price);
    }

    if (image !== undefined) {
      updateDoctorData.image = image;
    }

    if (about !== undefined) {
      updateDoctorData.about = about;
    }

    // =================================================
    // UPDATE DOCTOR
    // =================================================

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updateDoctorData, {
      new: true,
      runValidators: true,
    });

    // =================================================
    // UPDATE DOCTOR USER ACCOUNT
    // =================================================

    if (doctor.user) {
      const updateUserData = {};

      // -------------------------
      // Update name
      // -------------------------

      if (name !== undefined) {
        updateUserData.name = name.trim();
      }

      // -------------------------
      // Update email
      // -------------------------

      if (email !== undefined) {
        const normalizedEmail = email.toLowerCase().trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(normalizedEmail)) {
          return res.status(400).json({
            message: "Please enter a valid email",
          });
        }

        const existingUser = await User.findOne({
          email: normalizedEmail,
          _id: { $ne: doctor.user },
        });

        if (existingUser) {
          return res.status(400).json({
            message: "Email is already used by another user",
          });
        }

        updateUserData.email = normalizedEmail;
      }

      // -------------------------
      // Update password
      // -------------------------

      if (password && password.trim() !== "") {
        if (password.length < 6) {
          return res.status(400).json({
            message: "Password must be at least 6 characters",
          });
        }

        updateUserData.hash_password = await bcrypt.hash(password, 10);
      }

      // -------------------------
      // Save User
      // -------------------------

      if (Object.keys(updateUserData).length > 0) {
        await User.findByIdAndUpdate(doctor.user, updateUserData, {
          new: true,
          runValidators: true,
        });
      }
    }

    // =================================================
    // GET FINAL DOCTOR
    // =================================================

    const finalDoctor = await Doctor.findById(updatedDoctor._id).populate(
      "user",
      "-hash_password",
    );

    return res.status(200).json({
      message: "Doctor updated successfully",
      doctor: finalDoctor,
    });
  } catch (error) {
    console.error("UPDATE DOCTOR ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE DOCTOR
// =====================================================

export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    // Delete linked User account
    if (doctor.user) {
      await User.findByIdAndDelete(doctor.user);
    }

    // Delete Doctor
    await Doctor.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.error("DELETE DOCTOR ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// =====================================================
// GET DOCTOR APPOINTMENTS
// =====================================================

export const getDoctorAppointments = async (req, res) => {
  try {
    // =================================================
    // CHECK AUTHENTICATION
    // =================================================

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // =================================================
    // FIND DOCTOR LINKED TO USER
    // =================================================

    const doctor = await Doctor.findOne({
      user: req.user.id,
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor profile not found",
      });
    }

    // =================================================
    // GET APPOINTMENTS
    // =================================================

    const appointments = await Appointment.find({
      doctor: doctor._id,
    })
      .populate("user", "-hash_password")
      .populate("service")
      .populate("doctor")
      .sort({
        date: 1,
        time: 1,
      });

    return res.status(200).json({
      message: "Doctor appointments found",
      appointments,
    });
  } catch (error) {
    console.error("GET DOCTOR APPOINTMENTS ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// =====================================================
// COMPLETE DOCTOR APPOINTMENT
// =====================================================

export const completeDoctorAppointment = async (req, res) => {
  try {
    // =================================================
    // CHECK AUTHENTICATION
    // =================================================

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Appointment ID is required",
      });
    }

    // =================================================
    // FIND DOCTOR
    // =================================================

    const doctor = await Doctor.findOne({
      user: req.user.id,
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor profile not found",
      });
    }

    // =================================================
    // FIND APPOINTMENT
    // =================================================

    const appointment = await Appointment.findOne({
      _id: id,
      doctor: doctor._id,
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found or does not belong to this doctor",
      });
    }

    // =================================================
    // CHECK CANCELLED
    // =================================================

    if (appointment.status === "Cancelled") {
      return res.status(400).json({
        message: "Cancelled appointment cannot be completed",
      });
    }

    // =================================================
    // CHECK ALREADY COMPLETED
    // =================================================

    if (appointment.status === "Completed") {
      return res.status(400).json({
        message: "Appointment is already completed",
      });
    }

    // =================================================
    // COMPLETE APPOINTMENT
    // =================================================

    appointment.status = "Completed";

    await appointment.save();

    // =================================================
    // RETURN UPDATED APPOINTMENT
    // =================================================

    const updatedAppointment = await Appointment.findById(appointment._id)
      .populate("user", "-hash_password")
      .populate("service")
      .populate("doctor");

    return res.status(200).json({
      message: "Appointment completed successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("COMPLETE DOCTOR APPOINTMENT ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
