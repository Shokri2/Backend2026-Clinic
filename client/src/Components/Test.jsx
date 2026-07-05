import { useEffect } from "react";
import { api } from "../api.js";

export default function Test() {
  const testConnect = async () => {
    try {
      const res = await api.get("/");
      console.log(res);
      
    } catch (error) {
      console.log(error);
    }
  };
useEffect( ()=>{
testConnect()
},[])
  return <></>;
}
