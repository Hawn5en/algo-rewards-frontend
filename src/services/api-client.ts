import axios, { AxiosRequestConfig } from "axios";
import { GOVERNANCE_API_BASE_URL } from "../data/constants";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

// Create an axios instance with a default base URL.
const axiosInstance = axios.create({
  baseURL: GOVERNANCE_API_BASE_URL,
  headers: {},
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // For endpoints that return a paginated list
  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  // For endpoints that fetch a single item by ID (or string identifier)
  get = (id: number | string) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };

  // If you want a direct non-paginated fetch (e.g., /period/current),
  // you can add a method like:
  getSingle = (config?: AxiosRequestConfig) => {
    return axiosInstance.get<T>(this.endpoint, config).then((res) => res.data);
  };
}

export default APIClient;
