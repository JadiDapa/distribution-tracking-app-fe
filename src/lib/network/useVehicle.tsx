import { useState } from "react";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/AuthStore";
import useSWR, { mutate } from "swr";
import { Materials } from "../types/material";

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
    ["http://localhost:3000/api/materials", userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    materials: data?.data,
    isLoading,
    isError: error,
  };
}

// Get Single Material By Id
export const GetAccountById = (id: string) => {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    ["http://localhost:3000/api/materials/" + id, userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    materials: data?.data,
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
      setIsLoading(true);
      await axios.post(
        "http://localhost:3000/api/materials/create",
        { name, sku, status, detail, picture, categoryId },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
        setError(true);
      }
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
      await axios.put(
        `http://localhost:3000/api/materials/${id}`,
        { id, name, sku, status, detail, picture, categoryId },
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
      await axios.delete("http://localhost:3000/api/materials/" + convertId, {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      });
      mutate(["http://localhost:3000/api/materials", userData?.token]);
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
