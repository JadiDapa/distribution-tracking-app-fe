import { useState } from "react";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/AuthStore";
import { Requests } from "../types/request";
import useSWR, { mutate } from "swr";
import fileUpload from "./FileUpload";

const fetch = (url: string, token: string | undefined) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

// Get All Requests
export function GetRequestByAccountId(accountId?: string) {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [import.meta.env.VITE_API_URL + "requests/" + accountId, userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    requests: data?.data,
    isLoading,
    isError: error,
  };
}

// Get All Requests
export function GetRequestInboxs(accountId?: string) {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [
      import.meta.env.VITE_API_URL + "requests/inbox/" + accountId,
      userData?.token,
    ],
    ([url, token]) => fetch(url, token),
  );

  return {
    requests: data?.data,
    isLoading,
    isError: error,
  };
}

// Get Single Request By Id
export const GetRequestById = (id?: string) => {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [import.meta.env.VITE_API_URL + "requests/detail/" + id, userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    request: data?.data,
    isLoading,
    isError: error,
  };
};

// Create a New Request
export const CreateRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const postRequest = async ({
    type,
    reason,
    requesterId,
    requestedId,
    items,
    note,
    status,
  }: Requests) => {
    setLoading(true);
    setError(false);
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "requests/create",
        { type, reason, requesterId, requestedId, items, note, status },
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

  return { postRequest, loading, error };
};

// Edit an existing Request
export const EditRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { userData } = useAuthStore();

  const editRequest = async ({
    id,
    type,
    reason,
    requesterId,
    requestedId,
    items,
    note,
    status,
  }: Requests) => {
    setIsLoading(true);
    setError(false);
    try {
      await axios.put(
        import.meta.env.VITE_API_URL + `requests/${id}`,
        { type, reason, requesterId, requestedId, items, note, status },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
      mutate([
        import.meta.env.VITE_API_URL + "requests/inbox/" + userData?.id,
        userData?.token,
      ]);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { editRequest, isLoading, error };
};

// Edit an existing Request
export const SignPdf = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { userData } = useAuthStore();

  const signRequest = async ({
    id,
    signedPdf,
    status,
  }: {
    id: string;
    signedPdf: File;
    status: string;
  }) => {
    setIsLoading(true);
    setError(false);
    const signedPdfUrl = await fileUpload(signedPdf);
    try {
      await axios.put(
        import.meta.env.VITE_API_URL + `requests/sign/${id}`,
        { signedPdf: signedPdfUrl, status },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
      mutate([
        import.meta.env.VITE_API_URL + "requests/inbox/" + userData?.id,
        userData?.token,
      ]);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { signRequest, isLoading, error };
};

// Delete an Request Data
export const DeleteRequest = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const { userData } = useAuthStore();

  const deleteRequest = async (id: string) => {
    try {
      setIsLoading(true);
      setError(false);
      const convertId = Number(id);
      await axios.delete(
        import.meta.env.VITE_API_URL + "requests/" + convertId,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteRequest, isLoading, error };
};
