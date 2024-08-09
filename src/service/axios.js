"use client";
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const AxiosProvider = ({ children }) => {
  const { token } = useSelector((state) => {
    return {
      token: state?.auth?.user?.token
    }
  })

  useEffect(() => {
    createInstance()
  }, [token])

  const createInstance = () => {
    axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        if (response?.status === 200) {
          debugger
          return response;
        }
        if (!response) {
          debugger
          return toast.error("Network Error")
        }
      },
      (error) => {
        if (!error) {
          return toast.error("Network Error")
        }
        const data = error?.response
        if (error.response.status === 401) {
          toast.error("Token expired")
        } else if (error.response.status === 400) {
          if (data?.errors?.length) {
            toast.error(data?.errors[0])
          } else {
            toast.error(data?.errors || "Network Error")
          }
        } else {
          toast.error(data?.errors || "Network Error")
        }
        return error
      }
    );
  }
  return children;
}

const API = {
  get: async (url, params) => {
    return await axiosInstance.get(url)
  },
  post: async (url, body) => {
    return await axiosInstance.post(url, body)
  },
  put: async (url, body) => {
    return await axiosInstance.put(url, body)
  }
}

export { API, AxiosProvider }