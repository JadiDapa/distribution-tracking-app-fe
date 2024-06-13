import { useState } from "react";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/AuthStore";
import useSWR, { mutate } from "swr";
import { Accounts } from "../types/account";
import fileUpload from "./FileUpload";

const fetch = (url: string, token: string | undefined) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

// Get All Accounts
export function GetAccounts() {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [import.meta.env.VITE_API_URL + "accounts", userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    accounts: data?.data,
    isLoading,
    isError: error,
  };
}

// Get Single Account By Id
export const GetAccountById = (id?: string) => {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [import.meta.env.VITE_API_URL + `accounts/${id}`, userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    account: data?.data,
    isLoading,
    isError: error,
  };
};

// Create a New Account
export const CreateAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const postAccount = async ({
    name,
    user,
    password,
    status,
    unitId,
    higherAccountId,
  }: Accounts) => {
    setLoading(true);
    setError(false);
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "accounts/create",
        {
          name,
          user,
          password,
          status,
          unitId,
          higherAccountId,
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { postAccount, loading, error };
};

// Edit an existing Account
export const EditAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { userData } = useAuthStore();

  const editAccount = async ({
    id,
    name,
    user,
    password,
    status,
    unitId,
    higherAccountId,
    picture,
  }: Accounts) => {
    setIsLoading(true);
    setError(false);
    try {
      const pictureUrl = await fileUpload(picture);
      await axios.put(
        import.meta.env.VITE_API_URL + `accounts/${id}`,
        {
          name,
          user,
          password,
          status,
          unitId,
          higherAccountId,
          picture: pictureUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
      mutate([
        import.meta.env.VITE_API_URL + `accounts/${id}`,
        userData?.token,
      ]);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { editAccount, isLoading, error };
};

// Delete an Account Data
export const DeleteAccount = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const { userData } = useAuthStore();

  const deleteAccount = async (id: string) => {
    try {
      setIsLoading(true);
      setError(false);
      await axios.delete(import.meta.env.VITE_API_URL + "accounts/" + id, {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      });
      mutate([import.meta.env.VITE_API_URL + "accounts", userData?.token]);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteAccount, isLoading, error };
};
