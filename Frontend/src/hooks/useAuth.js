import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  const {
    user,
    setUser,
    loading,
    setLoading,
  } = context;

  const handleRegister = async ({
    name,
    email,
    password,
    confirmPassword,
  }) => {
    setLoading(true);

    try {
      const response = await register({
        name,
        email,
        password,
        confirmPassword,
      });

      return response;
    } catch (error) {
      console.log("Register Error:", error);

      return {
        success: false,
        message: "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
      const response = await login({
        email,
        password,
      });

      if (response.success) {
        setUser(response.user);
      }

      return response;
    } catch (error) {
      console.log("Login Error:", error);

      return {
        success: false,
        message: "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    handleRegister,
    handleLogin,
    user,
    loading
  };
};