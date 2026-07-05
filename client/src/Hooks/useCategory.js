import { useEffect, useState } from "react";
import { api } from "../api";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchAllCategories = async () => {
    // req => get, no data
    // preq =>? delete, put params
    // req => post data

    try {
      const res = await api.get("/all-categories");
      setCategories(res.data.categories);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return { categories };
};
