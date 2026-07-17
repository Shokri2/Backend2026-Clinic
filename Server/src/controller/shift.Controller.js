import Shift from "../model/shift.Model.js";
//create
export const createShift = async (req, res) => {
  try {
    const { employee, startTime, endTime, shiftNumber, isOverTime } = req.body;
    console.log(req.body);
    console.log(employee, startTime, endTime, shiftNumber, isOverTime);
    const overTime = "on" ? true : false;
    if (!employee || !startTime || !endTime || !shiftNumber) {
      return res
        .status(400)
        .json({ message: "Please enter the shift details!" });
    }

    const shift = await Shift.create({
      employee,
      startTime,
      endTime,
      shiftNumber,
      isOverTime: overTime,
    });

    if (!shift) {
      return res.status(400).json({ message: "could not assign new shift!" });
    }
    return res.status(201).json({ message: "shift created!" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "internal server error in shift" });
  }
};
//get all shifts
export const getAllShfits = async (req, res) => {
  try {
    const shifts = await Shift.find().populate("employee", "name email role");
    if (!shifts) {
      return res.status(200).json({ message: "no shifts", shifts: [] });
    }
    return res.status(200).json({ message: "gets", shifts });
  } catch (error) {
    return res.status(500).json({ message: "internal server error in shift" });
  }
};
//get all shifts for employee
export const getAllShfitsForEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const shifts = await Shift.find({ employee: id }).populate(
      "employee",
      "name email role",
    );
    if (!shifts) {
      return res.status(200).json({ message: "no shifts", shifts: [] });
    }
    return res.status(200).json({ message: "gets", shifts });
  } catch (error) {
    return res.status(500).json({ message: "internal server error in shift" });
  }
};

export const updateShiftStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const shifts = await Shift.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );
    if (!shifts) {
      return res.status(200).json({ message: "no shifts", shifts: [] });
    }
    return res.status(200).json({ message: "gets", shifts });
  } catch (error) {
    return res.status(500).json({ message: "internal server error in shift" });
  }
};
