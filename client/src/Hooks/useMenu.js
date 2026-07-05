import { useEffect, useState } from "react";
import { api } from "../api";
import toast from "react-hot-toast";
export const useMenu = () => {
  const [menu, setMenu] = useState([]);
  const fetchAllMenu = async () => {
    try {
      const res = await api.get("/all-menu");
      setMenu(res.data.menu);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const deleteMenu = async (menuId) => {
    try {
      const res = await api.delete(`/delete-menu/${menuId}`);
      fetchAllMenu();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchAllMenu();
  }, []);
  const addNewMenuItem = async (menuData) => {
    try {
      // validation
      if (!menuData.name || !menuData.catId || !menuData.price) {
        toast.error("Please add name, category name, price");
        return;
      }
      const res = await api.post("/create-menu", menuData);
      //refresh in front
      toast.success(res.data.message);
      await fetchAllMenu();
      console.log(menu);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const editMenuItem = async (menuData, id) => {
    try {
      console.log(menuData);

      const res = await api.put(`/update-menu/${id}`, menuData);
      toast.success(res.data.message);
      await fetchAllMenu();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return { menu, fetchAllMenu, deleteMenu, addNewMenuItem, editMenuItem };
};
