import { useState } from "react";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { saveToken } = useAuthStore();
  const navigate = useNavigate();

  const login = async (values: { name: string; password: string }) => {
    setIsLoading(true);
    setError("");

    await axios
      .post("http://localhost:3000/api/accounts/login", values)
      .then((response) => {
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        saveToken(token);
        setIsLoading(false);
        localStorage.setItem("firstLog", "true");
        navigate("/");
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message);
        }
      });
  };

  return { login, isLoading, error, setError };
};
