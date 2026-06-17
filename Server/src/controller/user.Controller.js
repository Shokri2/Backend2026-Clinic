import User from "../model/user.Model,js"

// crud
//create-read-update-delete

export const register=async(req, res) =>{
    try {
        const { name, email, password, confimpassword }=req.body
        if(!name|| !email|| !password || !confimpassword){
            return res.status(400).json({})
            //bad req 400
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"internel server error"
        })

    }
}