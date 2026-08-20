import Doctor from "../model/doctor.Model.js";
import User from "../model/auth.Model.js";
import bcrypt from "bcrypt";
import Appointment from "../model/appointment.Model.js";
// GET ALL DOCTORS
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

// GET DOCTOR BY ID
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

// CREATE DOCTOR
export const createDoctor = async (req, res) => {
  try {
    const { name, email, password, department, experience, image, about } =
      req.body;

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

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    if (!department || !department.trim()) {
      return res.status(400).json({
        message: "Department is required",
      });
    }

    if (experience === undefined || experience === null) {
      return res.status(400).json({
        message: "Experience is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email is already used",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      hash_password: hashedPassword,
      role: "doctor",
    });

    try {
      const doctor = await Doctor.create({
        user: user._id,
        name: name.trim(),
        department: department.trim(),
        experience,
        image,
        about,
      });

      const populatedDoctor = await Doctor.findById(doctor._id).populate(
        "user",
        "-hash_password",
      );

      return res.status(201).json({
        message: "Doctor created successfully",
        doctor: populatedDoctor,
      });
    } catch (doctorError) {
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

// UPDATE DOCTOR
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, password, department, experience, image, about } =
      req.body;

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    const updateDoctorData = {};

    if (name !== undefined) {
      updateDoctorData.name = name.trim();
    }

    if (department !== undefined) {
      updateDoctorData.department = department.trim();
    }

    if (experience !== undefined) {
      updateDoctorData.experience = experience;
    }

    if (image !== undefined) {
      updateDoctorData.image = image;
    }

    if (about !== undefined) {
      updateDoctorData.about = about;
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updateDoctorData, {
      new: true,
      runValidators: true,
    });

    if (doctor.user) {
      const updateUserData = {};

      if (name !== undefined) {
        updateUserData.name = name.trim();
      }

      if (email !== undefined) {
        const normalizedEmail = email.toLowerCase().trim();

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

      if (password && password.trim() !== "") {
        if (password.length < 6) {
          return res.status(400).json({
            message: "Password must be at least 6 characters",
          });
        }

        updateUserData.hash_password = await bcrypt.hash(password, 10);
      }

      if (Object.keys(updateUserData).length > 0) {
        await User.findByIdAndUpdate(doctor.user, updateUserData, {
          new: true,
          runValidators: true,
        });
      }
    }

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

// DELETE DOCTOR
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    if (doctor.user) {
      await User.findByIdAndDelete(doctor.user);
    }

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
export const getDoctorAppointments = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      user: req.user._id,
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor profile not found",
      });
    }

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