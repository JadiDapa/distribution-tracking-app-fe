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

// Get All Tools
export function GetToolInventories(accountId?: string) {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [
      import.meta.env.VITE_API_URL + "tool-inventories/" + accountId,
      userData?.token,
    ],
    ([url, token]) => fetch(url, token),
  );

  return {
    tools: data?.data,
    isLoading,
    isError: error,
  };
}

// Get Single Tool Inventory By Id
export const GetToolById = (id?: string) => {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [import.meta.env.VITE_API_URL + "tool-inventories/" + id, userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    tool: data?.data,
    isLoading,
    isError: error,
  };
};

// Update existing Tool
export const UpdateToolInvetory = () => {
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
        import.meta.env.VITE_API_URL + `tool-inventories/update`,
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
