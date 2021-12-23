import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});
/*
let user = this.$store.state.user;
console.log(user);
instance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
*/

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

export default axios;
