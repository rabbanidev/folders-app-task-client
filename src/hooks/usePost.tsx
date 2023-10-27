/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export const usePost = (url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const postFunc = async (data: any) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
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
        setError("Failed to create");
        setSuccess(false);
      }
    } catch (error: any) {
      setLoading(false);
      setSuccess(false);
      setError(error?.response?.data?.message || error.message);
    }
  };

  return { postFunc, loading, error, success };
};
