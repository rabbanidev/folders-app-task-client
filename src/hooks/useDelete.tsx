/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export const useDataDelete = (url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const deleteFunc = async (id: string) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setLoading(false);
        setError("");
        setSuccess(true);
      } else {
        setLoading(false);
        setError("Failed to delete the data");
        setSuccess(false);
      }
    } catch (error: any) {
      setLoading(false);
      setSuccess(false);
      setError(error?.response?.data?.message || error.message);
    }
  };

  return { deleteFunc, loading, error, success };
};
