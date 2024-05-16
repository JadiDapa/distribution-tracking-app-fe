import { useState } from "react";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/AuthStore";
import useSWR, { mutate } from "swr";
import { VehicleVariants } from "../types/vehicle";

const fetch = (url: string, token: string | undefined) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

// Get All Vehicle Variants
export function GetVehicleVariants() {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [import.meta.env.VITE_API_URL + "vehicle-variants", userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    categories: data?.data,
    isLoading,
    isError: error,
  };
}

// Get Single Vehicle Variant By Id
export const GetVehicleVariantById = (id: string) => {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [import.meta.env.VITE_API_URL + "vehicle-variants/" + id, userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    variant: data?.data,
    isLoading,
    isError: error,
  };
};

// Create a new Vehicle
export const CreateVehicleVariant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const postVehicle = async ({ category }: VehicleVariants) => {
    setIsLoading(true);
    setError(false);
    try {
      setIsLoading(true);
      await axios.post(
        import.meta.env.VITE_API_URL + "vehicle-variants/create",
        {
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
      mutate([
        import.meta.env.VITE_API_URL + "vehicle-variants",
        userData?.token,
      ]);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
        setError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { postVehicle, isLoading, error };
};

// Update existing Vehicle
export const EditVehicleVariant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const editVehicle = async ({ id, category }: VehicleVariants) => {
    setIsLoading(true);
    setError(false);
    try {
      await axios.put(
        import.meta.env.VITE_API_URL + "vehicle-variants/" + id,
        { category },
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

  return { editVehicle, isLoading, error };
};

// Delete an Vehicle Data
export const DeleteVehicleVariant = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState<boolean>(false);
  const { userData } = useAuthStore();

  const deleteVehicle = async (id: string) => {
    try {
      setIsLoading(true);
      setError(false);
      const convertId = Number(id);
      await axios.delete(
        import.meta.env.VITE_API_URL + "vehicle-variants/" + convertId,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
      mutate([
        import.meta.env.VITE_API_URL + "vehicle-variants",
        userData?.token,
      ]);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
      }
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteVehicle, isLoading, isError };
};
