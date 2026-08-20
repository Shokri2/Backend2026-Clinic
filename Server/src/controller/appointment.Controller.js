import Appointment from "../model/appointment.Model.js";
import Doctor from "../model/doctor.Model.js";

export const createAppointment = async (req, res) => {
  try {
    const { user, service, doctor, date, time, status } = req.body;

    if (!user) {
      return res.status(400).json({
        message: "User is required",
      });
    }

    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }

    if (!time) {
      return res.status(400).json({
        message: "Time is required",
      });
    }

    if (!service && !doctor) {
      return res.status(400).json({
        message: "Service or doctor is required",
      });
    }

    const appointment = await Appointment.create({
      user,
      service: service || undefined,
      doctor: doctor || undefined,
      date,
      time,
      status: status || "Booked",
    });

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate("user", "-hash_password")
      .populate("service")
      .populate("doctor");

    return res.status(201).json({
      message: "Appointment created successfully",
      appointment: populatedAppointment,
    });
  } catch (error) {
    console.error("CREATE APPOINTMENT ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("user", "-hash_password")
      .populate("service")
      .populate("doctor")
      .sort({
        date: 1,
        time: 1,
      });

    return res.status(200).json({
      message: "Appointments found",
      appointments,
    });
  } catch (error) {
    console.error("GET ALL APPOINTMENTS ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const appointments = await Appointment.find({
      user: userId,
    })
      .populate("user", "-hash_password")
      .populate("service")
      .populate("doctor")
      .sort({
        date: 1,
        time: 1,
      });

    return res.status(200).json({
      message: "User appointments found",
      appointments,
    });
  } catch (error) {
    console.error("GET USER APPOINTMENTS ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        message: "Doctor user ID is required",
      });
    }

    const doctor = await Doctor.findOne({
      user: userId,
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

export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Appointment ID is required",
      });
    }

    const appointment = await Appointment.findById(id)
      .populate("user", "-hash_password")
      .populate("service")
      .populate("doctor");

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      message: "Appointment found",
      appointment,
    });
  } catch (error) {
    console.error("GET APPOINTMENT ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const { date, time, service, doctor, status } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Appointment ID is required",
      });
    }

    const updateData = {};

    if (date !== undefined) {
      updateData.date = date;
    }

    if (time !== undefined) {
      updateData.time = time;
    }

    if (service !== undefined) {
      updateData.service = service;
    }

    if (doctor !== undefined) {
      updateData.doctor = doctor;
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    const appointment = await Appointment.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("user", "-hash_password")
      .populate("service")
      .populate("doctor");

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    console.error("UPDATE APPOINTMENT ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Appointment ID is required",
      });
    }

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const allowedStatuses = ["Booked", "Completed", "Cancelled", "Pending"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid appointment status",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    )
      .populate("user", "-hash_password")
      .populate("service")
      .populate("doctor");

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    console.error("UPDATE APPOINTMENT STATUS ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Appointment ID is required",
      });
    }

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("DELETE APPOINTMENT ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
