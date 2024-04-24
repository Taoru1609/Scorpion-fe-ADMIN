import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log("Request intercepted:", config);
    // You can modify headers, add tokens, etc. here

    // Retrieve the authentication token from wherever it's stored
    const token = localStorage.getItem("accessToken");

    // If token is available, add it to the request headers
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    console.log("Response intercepted:", response);
    return response;
  },
  function (error) {
    // Do something with response error
    if (error.response && error.response.status === 401) {
      // Redirect to login page
      window.location.href = "/public/login"; // Replace with your login page URL
    }
    return Promise.reject(error);
  }
);

export default axios;
