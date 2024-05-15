import { useState } from "react";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/AuthStore";
import useSWR, { mutate } from "swr";
import { ToolCategory } from "../types/tool";

const fetch = (url: string, token: string | undefined) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

// Get All Tool Categories
export function GetToolCategories() {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    ["http://localhost:3000/api/tool-categories", userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    categories: data?.data,
    isLoading,
    isError: error,
  };
}

// Get Single Tool Category By Id
export const GetToolCategoryById = (id: string) => {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    ["http://localhost:3000/api/tool-categories/" + id, userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    category: data?.data,
    isLoading,
    isError: error,
  };
};

// Create a new Tool Category
export const CreateToolCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const postToolCategory = async ({ category }: ToolCategory) => {
    setIsLoading(true);
    setError(false);
    try {
      setIsLoading(true);
      await axios.post(
        "http://localhost:3000/api/tool-categories/create",
        {
          category,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
      mutate(["http://localhost:3000/api/tool-categories", userData?.token]);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
        setError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { postToolCategory, isLoading, error };
};

// Update existing Tool Category
export const EditToolCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const editToolCategory = async ({ id, category }: ToolCategory) => {
    setIsLoading(true);
    setError(false);
    try {
      await axios.put(
        "http://localhost:3000/api/tool-categories/" + id,
        { category },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
      mutate(["http://localhost:3000/api/tool-categories", userData?.token]);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
      }
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { editToolCategory, isLoading, error };
};

// Delete an ToolCategory Data
export const DeleteToolCategory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState<boolean>(false);
  const { userData } = useAuthStore();

  const deleteToolCategory = async (id: string) => {
    try {
      setIsLoading(true);
      setError(false);
      const convertId = Number(id);
      await axios.delete(
        "http://localhost:3000/api/tool-categories/" + convertId,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
      mutate(["http://localhost:3000/api/tool-categories", userData?.token]);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
      }
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteToolCategory, isLoading, isError };
};
