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

// Get All Tool Updates
export function GetToolUpdates(accountId?: string) {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    ["http://localhost:3000/api/tool-updates/" + accountId, userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    updates: data?.data,
    isLoading,
    isError: error,
  };
}

// Get Single Tool Update By Id
export const GetToolUpdateById = (id?: string) => {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    ["http://localhost:3000/api/tool-updates/detail/" + id, userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    update: data?.data,
    isLoading,
    isError: error,
  };
};
