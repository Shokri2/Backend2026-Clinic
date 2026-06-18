import mongoose from "mongoose";





const userschema = mongoose.Schema({
  name: {
    Type: String,
    require: true,
    min: 3,
    max: 150,
  },
  email: {
    Type: String,
    require: true,
  },
  password: {
    Type: String,
    require: true,
    min: 8,
    max: 15,
  },
  role:{
    Type:String,
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