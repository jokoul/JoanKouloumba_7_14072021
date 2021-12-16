import { createStore } from "vuex";
import axios from "axios";

//Définition de l'url de base pour les requête vers mon API backend
const instance = axios.create({
  baseURL: "http://localhost:8080/",
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
    instance.defaults.headers.common["Authorization"] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

//création d'une instance de store
export default createStore({
  state: {
    status: "",
    user: user,
    firstname: "Joan",
    userInfos: {
      firstname: "Joan",
      lastname: "",
      email: "",
      password: "",
    },
  },
  getters: {
    getFirstname() {
      return this.$store.state.userInfos.firstname;
    },
  },
  mutations: {
    //Les mutations Vuex sont synchrones et permet de modifier le state.
    SETSTATUS(state, status) {
      //On modifie le "status" du state à partir de celui passé en payload
      state.status = status;
    },
    USERLOG(state, user) {
      //On accède au localStorage et on crée l'objet "user"
      localStorage.setItem("user", JSON.stringify(user));
      //On remet à jour le "user" dans le state à partir du localStorage.
      state.user = user;
    },
    USERINFOS(state, userInfos) {
      //On modifie le "userInfos" du state à partir de celui du payload
      state.userInfos = userInfos;
    },
  },
  actions: {
    //Les actions sont asynchrone et permettent de récupérer les données API.
    login({ commit }, USERINFOS) {
      //On crée une "promise" pour gérer notre code asynchrone
      return new Promise((resolve, reject) => {
        instance
          .post("auth/login", USERINFOS)
          .then(function (response) {
            commit("SETSTATUS", "");
            //On invoque notre mutation 'USERLOG' avec un payload
            commit("USERLOG", response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit("SETSTATUS", "error_login");
            reject(error);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          });
      });
    },
    createAccount({ commit }, USERINFOS) {
      //On invoque notre mutation 'SETSTATUS' avec un payload
      commit("SETSTATUS", "loading");
      return new Promise((resolve, reject) => {
        //...
        instance
          .post("auth/signup", USERINFOS)
          .then(function (response) {
            commit("SETSTATUS", "created");
            resolve(response);
          })
          .catch(function (error) {
            commit("SETSTATUS", "error_create");
            reject(error);
          });
      });
    },
  },
  modules: {},
});
