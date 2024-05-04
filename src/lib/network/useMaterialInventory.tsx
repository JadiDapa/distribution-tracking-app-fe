import { useState } from "react";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/AuthStore";
import useSWR, { mutate } from "swr";

const fetch = (url: string, token: string | undefined) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

// Get All Materials
export function GetMaterialInventories(accountId?: string) {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [
      "http://localhost:3000/api/material-inventories/" + accountId,
      userData?.token,
    ],
    ([url, token]) => fetch(url, token),
  );

  return {
    materialInventories: data?.data,
    isLoading,
    isError: error,
  };
}

// Get Single Material Inventory By Id
export const GetAccountById = (id: string) => {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    ["http://localhost:3000/api/material-inventories/" + id, userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    materials: data?.data,
    isLoading,
    isError: error,
  };
};

// Update existing Material
export const UpdateMaterialInvetory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const updateInventory = async ({
    accountId,
    reason,
    items,
    note,
  }: {
    accountId: number;
    reason: string;
    items: object;
    note?: string;
  }) => {
    setIsLoading(true);
    setError(false);
    try {
      await axios.post(
        `http://localhost:3000/api/material-inventories/update`,
        { accountId, reason, items, note },
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

  return { updateInventory, isLoading, error };
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
