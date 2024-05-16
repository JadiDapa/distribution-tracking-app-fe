import axios from "axios";
import useAuthStore from "../store/AuthStore";
import useSWR from "swr";

const fetch = (url: string, token: string | undefined) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

// Get All Materials
export function GetMaterialUpdates(accountId?: string) {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [
      "http://localhost:3000/api/material-updates/" + accountId,
      userData?.token,
    ],
    ([url, token]) => fetch(url, token),
  );

  return {
    updates: data?.data,
    isLoading,
    isError: error,
  };
}

// Get Single Material Inventory By Id
export const GetMaterialUpdateById = (id?: string) => {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [
      "http://localhost:3000/api/material-updates/detail/" + id,
      userData?.token,
    ],
    ([url, token]) => fetch(url, token),
  );

  return {
    update: data?.data,
    isLoading,
    isError: error,
  };
};
