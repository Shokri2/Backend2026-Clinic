import User from "../model/user.Model,js";

// crud
//create-read-update-delete

export const getALLUsers = async (req, res) => {
  try {
    const users = await User.find().select("-hash_password");
    if (users.length === 0) {
      return res.status(200).json({ message: " not user yet", users: [] });
    }
    return res.status(200).json({
      message: "user found",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internel server error",
    });
  }
};
