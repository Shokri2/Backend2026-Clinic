import { useState } from "react";
import { api } from "../api";
import toast from "react-hot-toast";
export const useEmployee = () => {
  const [emlployees, setEmployees] = useState([]);
  const fetchAllEmployess = async () => {
    try {
      const res = await api.get("/all-employees");
      // reget from db
      setEmployees(res.data.users);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return { fetchAllEmployess, emlployees };
};
