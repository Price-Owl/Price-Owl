import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import {submitUrl} from "../services/auth.api";

export const urlSubmit = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  const {
    loading,
    setLoading,
    productTitle,
    setProductTitle,
    price,
    setPrice
  } = context;

  const handleSubmitUrl = async({productUrl}) => {
    setLoading(true);
    try {
        const response = await submitUrl({productUrl});
        if(response.success){
            setProductTitle(response.data.title);
            setPrice(response.data.price);
        }
        return response;
    } catch (error) {
        console.log("Error in handle submit url::", error);
    }finally{
        setLoading(false);
    }
  }

  return {
    handleSubmitUrl,
    loading, 
    productTitle,
    price
  };
};