import User from "../model/user.Model.js";

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
export const getUserById=async (req,res) =>{
  try {
    const UserId =req.params.id

if(!UserId){
  return res.status(400).json({
    message: "user not selected",
  });
}
const user = await User.findById({ UserId }).select('-hash_password')
if(!user){
   return res.status(404).json({
     message: "user not found",
   });
}
 return res.status(200).json({
   message: "user found",user
 });

  } catch (error) {
    return res.status(500).json({
      message: "internel server error",
    });
  }
}


export const deleteUser= async(req, res)=>{
  try {
    const id= req.params.id
  if(!id){
     return res.status(400).json({
       message: " user not select",
     });
  }
const user = await User.findByIdAndDelete(id);
 if(!user){
   return res.status(400).json({
     message: "not deleted",
   });
 }
 return res.status(200).json({
   message: "user deleted",
 });


  } catch (error) {
    return res.status(500).json({
      message: "internel server error",
    });
  }
}

export const updateUser =async(req,res) =>{
  try {
    const {id}=req.params
    const {name , email}=req.body
 if (!id) {
   return res.status(400).json({
     message: " user not updated",
   });
 }
 if(!email ||! name){
   return res.status(400).json({
     message: "please enter new value",
     user,
   });
 }
    const user = await User.findByIdAndUpdate(id, 
      { name, email }
    ,
  {new: true})
    if (!user) {
      return res.status(400).json({
        message: "user update",user
      });
    }
  } catch (error) {
     return res.status(500).json({
       message: "internel server error",
     });
  }
export const getUserByEmail=async(req,res) =>{
  try {
    const email =req.body
    if(!email){
          return res.status(400).json({
       message: "enter a valid email",
     });
    }
    const isExist=await User.findOne({email})
    if(!isExist){
        return res.status(404).json({
       message: "user email not found",
     });
    }
       return res.status(200).json({
       message: "user email  found",isExist
     });
  } catch (error) {
      return res.status(500).json({
       message: "internel server error",
     });
  }
}
}


export const updateUserRole=async (req,res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      if (!id) {
        return res.status(400).json({
          message: " user not updated",
        });
      }
      if (!role) {
        return res.status(400).json({
          message: "please enter new value",
          user,
        });
      }
      const user = await User.findByIdAndUpdate(
        id,
        { name, email },
        { new: true },
      );
      if (!user) {
        return res.status(400).json({
          message: "user update",
          user,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "internel server error",
      });
    }
}


