import { useState } from "react";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/AuthStore";
import useSWR, { mutate } from "swr";
import { Materials } from "../types/material";
import fileUpload from "./FileUpload";

const fetch = (url: string, token: string | undefined) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

// Get All Materials
export function GetMaterials() {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [import.meta.env.VITE_API_URL + "materials", userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    materials: data?.data,
    isLoading,
    isError: error,
  };
}

// Get Single Material By Id
export const GetMaterialById = (id?: string) => {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [import.meta.env.VITE_API_URL + "materials/" + id, userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    material: data?.data,
    isLoading,
    isError: error,
  };
};

// Create a new Material
export const CreateMaterial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const postMaterial = async ({
    name,
    sku,
    status,
    detail,
    picture,
    categoryId,
  }: Materials) => {
    setIsLoading(true);
    setError(false);
    try {
      const pictureUrl = await fileUpload(picture);
      await axios.post(
        import.meta.env.VITE_API_URL + "materials/create",
        { name, sku, status, detail, picture: pictureUrl, categoryId },
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

  return { postMaterial, isLoading, error };
};

// Update existing Material
export const EditMaterial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const editMaterial = async ({
    id,
    name,
    sku,
    status,
    detail,
    picture,
    categoryId,
  }: Materials) => {
    setIsLoading(true);
    setError(false);
    try {
      const pictureUrl = await fileUpload(picture);
      await axios.put(
        import.meta.env.VITE_API_URL + `materials/${id}`,
        { name, sku, status, detail, picture: pictureUrl, categoryId },
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

  return { editMaterial, isLoading, error };
};

// Delete an Account Data
export const DeleteMaterial = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState<boolean>(false);
  const { userData } = useAuthStore();

  const deleteMaterial = async (id: string) => {
    try {
      setIsLoading(true);
      setError(false);
      const convertId = Number(id);
      await axios.delete(
        import.meta.env.VITE_API_URL + "materials/" + convertId,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
      mutate([import.meta.env.VITE_API_URL + "materials", userData?.token]);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
      }
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteMaterial, isLoading, isError };
};
