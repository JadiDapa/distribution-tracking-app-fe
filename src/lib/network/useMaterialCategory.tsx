import { useState } from "react";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/AuthStore";
import useSWR, { mutate } from "swr";
import { MaterialCategories } from "../types/material";

const fetch = (url: string, token: string | undefined) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

// Get All Material Categories
export function GetMaterialCategories() {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [import.meta.env.VITE_API_URL + "material-categories", userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    categories: data?.data,
    isLoading,
    isError: error,
  };
}

// Get Single Material Category By Id
export const GetMaterialCategoryById = (id: string) => {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [
      import.meta.env.VITE_API_URL + "material-categories/" + id,
      userData?.token,
    ],
    ([url, token]) => fetch(url, token),
  );

  return {
    category: data?.data,
    isLoading,
    isError: error,
  };
};

// Create a new Material Category
export const CreateMaterialCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const postMaterialCategory = async ({ category }: MaterialCategories) => {
    setIsLoading(true);
    setError(false);
    try {
      setIsLoading(true);
      await axios.post(
        import.meta.env.VITE_API_URL + "material-categories/create",
        {
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
      mutate([
        import.meta.env.VITE_API_URL + "material-categories",
        userData?.token,
      ]);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
        setError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { postMaterialCategory, isLoading, error };
};

// Update existing Material Category
export const EditMaterialCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const editMaterialCategory = async ({ id, category }: MaterialCategories) => {
    setIsLoading(true);
    setError(false);
    try {
      await axios.put(
        import.meta.env.VITE_API_URL + "material-categories/" + id,
        { category },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
      mutate([
        import.meta.env.VITE_API_URL + "material-categories",
        userData?.token,
      ]);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
      }
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { editMaterialCategory, isLoading, error };
};

// Delete an MaterialCategory Data
export const DeleteMaterialCategory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState<boolean>(false);
  const { userData } = useAuthStore();

  const deleteMaterialCategory = async (id: string) => {
    try {
      setIsLoading(true);
      setError(false);
      await axios.delete(
        import.meta.env.VITE_API_URL + "material-categories/" + id,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
      mutate([
        import.meta.env.VITE_API_URL + "material-categories",
        userData?.token,
      ]);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
      }
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteMaterialCategory, isLoading, isError };
};
