import { useState } from "react";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { saveUser } = useAuthStore();
  const navigate = useNavigate();

  const login = async (values: { name: string; password: string }) => {
    setIsLoading(true);
    setError("");

    await axios
      .post(import.meta.env.VITE_API_URL + "accounts/login", values)
      .then((response) => {
        const data = response.data.data;
        localStorage.setItem("userData", JSON.stringify(data));
        saveUser(data);
        localStorage.setItem("firstLog", "true");
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { login, isLoading, error, setError };
};
