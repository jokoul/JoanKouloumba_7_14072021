import { createStore } from "vuex";
import axios from "axios";

//Définition de l'url de base pour les requête vers mon API backend
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
    userInfos: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      profil: "",
    },
  },
  getters: {
    //Pour afficher firstname dans les composant
    getFirstname(state) {
      return state.userInfos.firstname;
    },
    getProfil(state) {
      return state.userInfos.profil;
    },
    getUser(state) {
      return state.user;
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
        userId: -1,
        token: "",
      };
      (state.userInfos = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        profil: "",
      }),
        (state.posts = []),
        localStorage.removeItem("user");
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
        instance
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
        instance
          .post("/auth/login", USER_INFOS)
          .then(function (response) {
            commit("SET_STATUS", "");
            //On invoque notre mutation 'USERLOGIN' avec un payload qui contient userId et le token en provenance du backend.
            commit("USER_LOGIN", response.data);
            new Promise((resolve, reject) => {
              instance
                .get(`/auth/accounts/${user.userId}`)
                .then((res) => {
                  commit("USER_INFOS", res.data.user);
                  resolve(res);
                })
                .catch((error) => reject(error));
            });
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
        instance
          .get(`/auth/accounts/${user.userId}`)
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
