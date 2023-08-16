
import axios from "axios";
import {toast} from 'react-toastify'
export const toastSuccess = (message:string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  
  export const toastFailed = (message:string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

export const API = axios.create({ baseURL: "http://localhost:5000" });