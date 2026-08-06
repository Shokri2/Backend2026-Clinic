import Doctor from "../model/doctor.Model.js";

// Get All Doctors + Search + Filter
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

    const doctors = await Doctor.find(filter);

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Doctor By Id
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Doctor
export const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Doctor
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Doctor
export const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);

    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
