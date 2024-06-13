import { useState } from "react";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/AuthStore";
import useSWR, { mutate } from "swr";
import { Vehicles } from "../types/vehicle";
import fileUpload from "./FileUpload";

const fetch = (url: string, token: string | undefined) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

// Get All Vehicles
export function GetVehicles() {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [import.meta.env.VITE_API_URL + "vehicles", userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    vehicles: data?.data,
    isLoading,
    isError: error,
  };
}

// Get All Vehicles
export function GetVehiclesByAccountId(accountId?: string) {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [import.meta.env.VITE_API_URL + "vehicles/" + accountId, userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    vehicles: data?.data,
    isLoading,
    isError: error,
  };
}

// Get Single Vehicle By Id
export const GetVehicleById = (id?: string) => {
  const { userData } = useAuthStore();
  const { data, error, isLoading } = useSWR(
    [import.meta.env.VITE_API_URL + "vehicles/detail/" + id, userData?.token],
    ([url, token]) => fetch(url, token),
  );

  return {
    vehicle: data?.data,
    isLoading,
    isError: error,
  };
};

// Create a new Vehicle
export const CreateVehicle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const postVehicle = async ({
    police_number,
    variantId,
    brand,
    detail,
    manufacture_year,
    contract_start,
    contract_end,
    areaId,
    locationId,
    picture,
  }: Vehicles) => {
    setIsLoading(true);
    setError(false);
    const pictureUrl = await fileUpload(picture);
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "vehicles/create",
        {
          police_number,
          variantId,
          brand,
          detail,
          manufacture_year,
          contract_start,
          contract_end,
          areaId,
          locationId,
          picture: pictureUrl,
        },
        {
          headers: {
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

  return { postVehicle, isLoading, error };
};

// Update existing Vehicle
export const EditVehicle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const editVehicle = async ({
    id,
    police_number,
    variantId,
    brand,
    detail,
    manufacture_year,
    contract_start,
    contract_end,
    areaId,
    locationId,
    picture,
  }: Vehicles) => {
    setIsLoading(true);
    setError(false);
    const pictureUrl = await fileUpload(picture);
    try {
      await axios.put(
        import.meta.env.VITE_API_URL + `vehicles/${id}`,
        {
          police_number,
          variantId: Number(variantId),
          brand,
          detail,
          manufacture_year,
          contract_start,
          contract_end,
          areaId: Number(areaId),
          locationId: Number(locationId),
          picture: pictureUrl,
        },
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

// Update existing Vehicle
export const MoveVehicle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userData } = useAuthStore();

  const moveVehicle = async ({
    id,
    locationId,
    areaId,
  }: {
    id: string;
    locationId: number | string;
    areaId: number | string;
  }) => {
    setIsLoading(true);
    setError(false);
    try {
      await axios.put(
        import.meta.env.VITE_API_URL + `vehicles/${id}`,
        {
          locationId,
          areaId,
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
      mutate([
        import.meta.env.VITE_API_URL + "vehicles/" + userData?.id,
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

  return { moveVehicle, isLoading, error };
};

// Delete an Vehicle Data
export const DeleteVehicle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState<boolean>(false);
  const { userData } = useAuthStore();

  const deleteVehicle = async (id: string) => {
    try {
      setIsLoading(true);
      setError(false);
      const convertId = Number(id);
      await axios.delete(
        import.meta.env.VITE_API_URL + "vehicles/" + convertId,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      );
      mutate([import.meta.env.VITE_API_URL + "vehicle", userData?.token]);
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
