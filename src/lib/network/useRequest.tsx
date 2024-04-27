import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/AuthStore";
import { Request } from "../types/request";

export type AccountUnit = {
  id: number;
  unit: string;
};

export type RequestType = {
  requester: number;
  requested: number;
  items: string;
  note: string;
  status: string;
};

export type EditAccountType = {
  id: number;
  name: string;
  user: string;
  password: string;
  confirmPassword: string;
  status: string;
  unitId: number;
  relation?: string | undefined;
};

const defaultValues = {
  id: 0,
  name: "",
  user: "",
  password: "",
  confirmPassword: "",
  status: "active",
  unitId: "3",
  relation: "",
  unit: { id: 0, unit: "" },
};

// Fetch Accounts Data
export const GetRequests = () => {
  const [data, setData] = useState<Request[]>([
    {
      id: 2,
      code: "8324034",
      requested: "ULP",
      type: "Material",
      total: 10,
      status: "pending",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  //   const { token } = useAuthStore();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setIsLoading(true);
  //       setError(false);
  //       try {
  //         const response = await axios.get("http://localhost:3000/api/accounts", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         setData(response.data.data);
  //       } catch (error) {
  //         setError(true);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, [token]);

  return { data, isLoading, error };
};

export const GetRequestById = (id: string) => {
  const [data, setData] = useState<AccountProps>(defaultValues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(false);
      const convertId = Number(id);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/accounts/" + convertId,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setData(response.data.data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  return { data, isLoading, error };
};

export const CreateRequest = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const postRequest = async ({
    requester,
    requested,
    items,
    note,
    status,
  }: Request) => {
    setLoading(true);
    setError(false);
    setIsSuccess(false);
    try {
      await axios.post(
        "http://localhost:3000/api/request/create",
        { requester, requested, items, note, status },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { postRequest, isSuccess, loading, error };
};

// Edit an existing Account
export const EditAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { token } = useAuthStore();

  const editAccount = async ({
    id,
    name,
    user,
    password,
    status,
    unitId,
    relation,
  }: EditAccountType) => {
    setIsLoading(true);
    setError(false);
    try {
      await axios.put(
        `http://localhost:3000/api/accounts/${id}`,
        { name, user, password, status, unitId: Number(unitId), relation },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  return { editAccount, isLoading, error };
};

// Delete an Account Data
export const DeleteAccount = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const { token } = useAuthStore();

  const deleteAccount = async (id: string) => {
    try {
      setIsLoading(true);
      setError(false);
      const convertId = Number(id);
      await axios.delete("http://localhost:3000/api/accounts/" + convertId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteAccount, isLoading, error };
};
