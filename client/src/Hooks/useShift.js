import { useState } from "react";
import { api } from "../api";
import toast from "react-hot-toast";
export const useShift = () => {
  const [shifts, setShifts] = useState([]);
  const [employeeShifts, setEmplyeeShifts] = useState([]);
  const fetchAllShifts = async () => {
    try {
      const res = await api.get("/all-shifts");
      // reget from db
      setShifts(res.data.shifts);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const addNewShift = async (shiftData) => {
    try {
      console.log(shiftData);

      // validation
      if (!shiftData.employee || !shiftData.startTime || !shiftData.endTime) {
        toast.error("Please add the details");
        return;
      }
      const res = await api.post("/create-shift", shiftData);
      //refresh in front

      toast.success(res.data.message);
      await fetchAllShifts();
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  };
  const fetchEmployeeShifts = async (id) => {
    try {
      const res = await api.get(`/employee-shift/${id}`);
      setEmplyeeShifts(res.data.shifts);
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  };
  const updateEmployeeStatus = async (id, status) => {
    try {
      const res = await api.put(`/update-shift/${id}`, { status });
      toast.success("updated done");
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  };
  return {
    fetchAllShifts,
    shifts,
    addNewShift,
    fetchEmployeeShifts,
    employeeShifts,
    updateEmployeeStatus,
  };
};
