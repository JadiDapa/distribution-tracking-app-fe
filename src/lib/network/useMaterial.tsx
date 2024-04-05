import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../store/AuthStore";

type AccountUnit = {
  id: number;
  unit: string;
};

export type AccountProps = {
  id: number;
  name: string;
  user: string;
  password: string;
  picture?: string;
  status: string;
  unitId: number;
  relation?: string;
  unit: AccountUnit;
};

// Fetch Accounts Data
export const GetMaterials = () => {
  const [data, setData] = useState<null | AccountProps[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const { token } = useAuthStore();

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/accounts", {
          headers: {
            authorization: token,
          },
        });
        setData(response.data.data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { data, isLoading, error };
};

// Create a new Account
export const CreateMaterial = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const postData = async (postData: AccountProps) => {
    setLoading(true);
    setError(false);
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/accounts", postData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error };
};
