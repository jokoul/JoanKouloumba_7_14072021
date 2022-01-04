import axios from "axios";
/*
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

let user = localStorage.getItem("user");

if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  } catch (error) {
    console.log(error);
    user = {
      userId: -1,
      token: "",
    };
  }
}
*/
/*
const HTTP = axios.create({
  baseURL: `http://localhost:3000/api`,
});

HTTP.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.token != null) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export { HTTP };
*/

let user = localStorage.getItem("user");
axios.defaults.baseURL = "http://localhost:3000/api";

if (!user) {
  user = {
    userId: null,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;
  } catch (error) {
    user = {
      userId: null,
      token: "",
    };
  }
}

export default axios;
