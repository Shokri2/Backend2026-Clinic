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

  const addNewMenuItem = async (menuData) => {
    try {
      if (!menuData.name || !menuData.catId || !menuData.price) {
        toast.error("Please add name, category name, price");
        return;
      }

      const res = await api.post("/create-menu", menuData);

      toast.success(res.data.message);
      await fetchAllMenu();

      console.log(menu);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return { categories };
};
