import { useCallback, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import * as qs from "qs";

import { GenericInterface, BASE_URL, HttpMethod } from "../../constants";

axios.defaults.baseURL = BASE_URL;
export function useApi<T>(
  url: string,
  method = HttpMethod.GET,
  config?: AxiosRequestConfig
) {
  const [response, setResponse] = useState<T | undefined | null>(undefined);
  const [error, setError] = useState<AxiosError>();
  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);

  const invokeApi = useCallback(
    async (
      params?: GenericInterface | null,
      payload?: GenericInterface | null,
      headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    ) => {
      try {
        setIsLoading(true);
        const result = await axios.request({
          headers,
          method,
          url,
          ...config,
          paramsSerializer: () => qs.stringify(params),
          data: payload,
          params,
        });
        setResponse(result.data);
        setStatusCode(result.status);
        return result?.data;
      } catch (e) {
        setError(e as AxiosError);
        setStatusCode(500);
      } finally {
        setIsLoading(false);
      }
    },
    [url, method, config]
  );
  return {
    response,
    error,
    isLoading,
    invokeApi,
    statusCode,
  };
}

export default useApi;
