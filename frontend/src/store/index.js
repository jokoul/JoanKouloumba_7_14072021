import { createStore } from "vuex";
import axios from "../axios.js";

let user = JSON.parse(localStorage.getItem("user"));
//création d'une instance de store
export default createStore({
  state: {
    status: "",
    user: user,
    userInfos: {
      firstname: "",
      lastname: "",
      email: "",
      profil: "",
    },
  },
  getters: {
    //Pour afficher firstname dans les composant
    getProfil(state) {
      return state.userInfos.profil;
    },
    getUser(state) {
      return state.user;
    },
    getUserAccount(state) {
      return state.userInfos;
    },
  },
  mutations: {
    //Les mutations Vuex sont synchrones et permet de modifier le state.
    SET_STATUS(state, status) {
      //On modifie le "status" du state à partir de celui passé en payload
      state.status = status;
    },
    USER_LOGIN(state, user) {
      //On accède au localStorage et on crée l'objet "user"
      localStorage.setItem("user", JSON.stringify(user));
      //On remet à jour le "user" dans le state à partir du localStorage.
      state.user = user;
    },
    USER_LOGOUT(state) {
      state.user = {
        userId: null,
        token: "",
      };
      state.userInfos = {
        firstname: "",
        lastname: "",
        email: "",
        profil: "",
      };
      localStorage.removeItem("user");
      localStorage.removeItem("name");
    },
    USER_INFOS(state, userInfos) {
      //On modifie le "userInfos" du state à partir de celui du payload
      state.userInfos = userInfos;
    },
  },
  actions: {
    //Les actions sont asynchrone et permettent de récupérer les données API.
    createAccount({ commit }, USER_INFOS) {
      //On invoque notre mutation 'SETSTATUS' avec un payload
      commit("SET_STATUS", "loading");
      return new Promise((resolve, reject) => {
        //...
        axios
          .post("/auth/register", USER_INFOS)
          .then(function (response) {
            commit("SET_STATUS", "created");
            resolve(response);
          })
          .catch(function (error) {
            commit("SET_STATUS", "error_create");
            reject(error);
          });
      });
    },

    login({ commit }, USER_INFOS) {
      //On crée une "promise" pour gérer notre code asynchrone
      return new Promise((resolve, reject) => {
        axios
          .post("/auth/login", USER_INFOS)
          .then(function (response) {
            commit("SET_STATUS", "");
            //On invoque notre mutation 'USERLOGIN' avec un payload qui contient userId et le token en provenance du backend.
            commit("USER_LOGIN", response.data);
            console.log(response.data);
            axios
              .get(`/auth/accounts/${response.data.userId}`)
              .then((res) => {
                commit("USER_INFOS", res.data.user);
                console.log(res.data);
                resolve(res);
              })
              .catch((error) => reject(error));
            resolve(response);
          })
          .catch(function (error) {
            commit("SET_STATUS", "error_login");
            reject(error);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          });
      });
    },

    getUserInfos({ commit }) {
      return new Promise((resolve, reject) => {
        console.log(user);
        let storageUser = JSON.parse(localStorage.getItem("user"));
        axios
          .get(`/auth/accounts/${storageUser.userId}`)
          .then((res) => {
            commit("USER_INFOS", res.data.user);
            resolve(res);
          })
          .catch((error) => reject(error));
      });
    },
  },
  modules: {},
});
