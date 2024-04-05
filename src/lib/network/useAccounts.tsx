import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/AuthStore";

export type AccountUnit = {
  id: number;
  unit: string;
};

export type AccountProps = {
  id: number;
  name: string;
  user: string;
  password: string;
  picture?: string;
  status: string;
  unitId: string;
  relation?: string;
  unit: AccountUnit;
};

export type AccountType = {
  name: string;
  user: string;
  password: string;
  confirmPassword: string;
  status: string;
  unitId: string;
  relation?: string | undefined;
};

// Fetch Accounts Data
export const GetAccounts = () => {
  const [data, setData] = useState<AccountProps[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await axios.get("http://localhost:3000/api/accounts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { data, isLoading, error };
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

export const GetAccountById = (id: string) => {
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

export type CreateAccountType = {
  name: string;
  user: string;
  password: string;
  confirmPassword?: string;
  status: string;
  unitId: string;
  relation?: string | undefined;
};
// Create a new Account
export const CreateAccount = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { token } = useAuthStore();

  const postAccount = async ({
    name,
    user,
    password,
    status,
    unitId,
    relation,
  }: CreateAccountType) => {
    setLoading(true);
    setError(false);
    setIsSuccess(false);
    try {
      await axios.post(
        "http://localhost:3000/api/accounts/create",
        { name, user, password, status, unitId: Number(unitId), relation },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  return { postAccount, isSuccess, loading, error };
};

export type EditAccountType = {
  id: string;
  name: string;
  user: string;
  password: string;
  status: string;
  unitId: string;
  relation?: string | undefined;
};

// Edit an existing Account
export const EditAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { token } = useAuthStore();

  const editAccount = async ({
    name,
    user,
    password,
    status,
    unitId,
    relation,
  }: AccountType) => {
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
