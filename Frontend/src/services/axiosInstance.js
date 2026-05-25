import axios from "axios";
let token = localStorage.getItem("token");
const axiosInstance = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://student-data-management-system-rb1m.onrender.com",
  headers: {
    Authorization: `Bearer ${token}`, //local storage ya session storagese tokken share
  },
  withCredentials: true, //cookies accesss
});

export default axiosInstance;
