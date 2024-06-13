import { useState } from "react";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/AuthStore";
import useSWR, { mutate } from "swr";
import { Tools } from "../types/tool";
import fileUpload from "./FileUpload";

const fetch = (url: string, token: string | undefined) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

// Get All Tools
export function GetTools() {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [import.meta.env.VITE_API_URL + "tools", userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    tools: data?.data,
    isLoading,
    isError: error,
  };
}

// Get Single Tool By Id
export const GetToolById = (id?: string) => {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [import.meta.env.VITE_API_URL + "tools/" + id, userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    tool: data?.data,
    isLoading,
    isError: error,
  };
};

// Create a new Tool
export const CreateTool = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const postTool = async ({
    name,
    sku,
    status,
    expired_at,
    detail,
    picture,
    categoryId,
  }: Tools) => {
    setIsLoading(true);
    setError(false);
    const pictureUrl = await fileUpload(picture);
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "tools/create",
        {
          name,
          sku,
          status,
          expired_at,
          detail,
          picture: pictureUrl,
          categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
      }
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { postTool, isLoading, error };
};

// Update existing Tool
export const EditTool = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const editTool = async ({
    id,
    name,
    sku,
    status,
    expired_at,
    detail,
    picture,
    categoryId,
  }: Tools) => {
    setIsLoading(true);
    setError(false);
    const pictureUrl = await fileUpload(picture);
    try {
      await axios.put(
        import.meta.env.VITE_API_URL + `tools/${id}`,
        {
          name,
          sku,
          status,
          expired_at,
          detail,
          picture: pictureUrl,
          categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
      }
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { editTool, isLoading, error };
};

// Delete an Tool Data
export const DeleteTool = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState<boolean>(false);
  const { userData } = useAuthStore();

  const deleteTool = async (id: string) => {
    try {
      setIsLoading(true);
      setError(false);
      const convertId = Number(id);
      await axios.delete(import.meta.env.VITE_API_URL + "tools/" + convertId, {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      });
      mutate([import.meta.env.VITE_API_URL + "tools", userData?.token]);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
      }
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteTool, isLoading, isError };
};
