import mongoose from "mongoose";



const userSchema =mongoose.Schema({
    name: {
    Type: String,
  },
  email: {
    Type: String,
    require: true,
  },
  hash_password: {
    Type: String,
    require: true,
    min: 8,
    
  },
  role:{
    Type:String,
    // user or admin 
    enum:['user','admin'],
    default:"user",
  }
},
{
    timestamp :true
});
export default mongoose.model("User", userschema);
export default User

