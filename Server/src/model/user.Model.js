import mongoose from "mongoose";





const userschema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 3,
    max: 150,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    min: 8,
    max: 15,
  },
  role:{
    type:String,
    // user or admin 
    enum:['user','admin'],
    default:"user"
  }
},
{
    timestamps :true
}

);
export default mongoose.model("User", userschema);