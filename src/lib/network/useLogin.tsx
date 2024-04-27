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
      .post("http://localhost:3000/api/accounts/login", values)
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
      });
  };

  return { login, isLoading, error, setError };
};
