import Menu from "../model/menu.Model.js";

export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, image, catId, is_publish } = req.body;
    console.log(typeof price);

    if (!name || !price || !catId) {
      return res.status(400).json({
        message: "name, price and category are required!",
      });
    }
    const menu = await Menu.create({
      name,
      description,
      price,
      image,
      catId,
      is_publish,
    });
    if (!menu) {
      return res.status(400).json({ message: "Could ot create new menu item" });
    }
    return res.status(201).json({ message: "created done", menu: menu });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "internal server error , " + error.message });
  }
};

export const getAllMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    if (menu.length === 0) {
      return res.status(200).json({ message: "no menu yet", menu: [] });
    }
    return res.status(200).json({ message: "menu gets", menu: menu });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error , " + error.message });
  }
};

//task:
//get menu by id
export const getMenuItemById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "No Item Selected" });
    }
    const menuItem = await Menu.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: "item not found" });
    }
    return res.status(200).json({ message: "item found", menu: menuItem });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error , " + error.message });
  }
};

//delete menu
export const deleteMenuById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "No Item Selected" });
    }
    const menuItem = await Menu.findByIdAndDelete(id);
    if (!menuItem) {
      return res.status(404).json({ message: "item not found" });
    }
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error , " + error.message });
  }
};

//update menu => name, desc, price, image, catid
export const updateMenuInfo = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    if (!id) {
      return res.status(400).json({ message: "No Item Selected" });
    }
    const {
      name,
      description,
      price,
      image,
      catId = "6a26b192076f48abd37aa0c8",
    } = req.body;
    console.log(req.body);

    if (!name || !price || !catId) {
      return res
        .status(400)
        .json({ message: "name, price and category are required" });
    }

    const updateItem = await Menu.findByIdAndUpdate(
      id,
      { name, description, price, image, catId },
      { new: true },
    );
    if (!updateItem) {
      return res.status(404).json({ message: "item not found!" });
    }
    return res.status(200).json({ message: "updated!", menu: updateItem });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error , " + error.message });
  }
};

//publishMenu =? update is publish
export const updateMenuItemStatus = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "No Item Selected" });
    }
    const existedItem = await Menu.findById(id);
    const menuItem = await Menu.findByIdAndUpdate(
      id,
      { is_publish: !existedItem.is_publish },
      { new: true },
    );
    if (!menuItem) {
      return res.status(404).json({ message: "item not found!" });
    }
    return res.status(200).json({ message: "status updated!", menu: menuItem });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error , " + error.message });
  }
};
