import Alert from "@mui/material"
import {api} from "../api.js"

export const useAuth = () => {
  const register = async (formData) => {
    // pass email name confirm =form data
    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmpassword
      ) {
         
        <Alert severity="error">
         All fields are  required
        </Alert>
      }
      if (password !== confirmpassword) {
         
         <Alert severity="error">password not match</Alert>;
      }
      const res = await api.post("/auth/register", formData);
       <Alert>
       {res.data.message || "created account done"}
      </Alert>

    } catch (error) {}
  }

  return {register}
}
