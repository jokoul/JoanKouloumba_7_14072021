<template>
  <div>
    <header class="header">
      <router-link class="header__link" to="/">
        <img
          class="header__img"
          src="../assets/logo_above.png"
          alt="groupomania logo"
        />
      </router-link>
    </header>
    <div class="title">
      <h1>Welcome to Grouponania social network</h1>
      <p>Join our community and share your passion with us</p>
    </div>
    <div class="card">
      <div class="card__btn">
        <div
          @click="toggleToLogin()"
          class="card__btn__login"
          :class="{ btn_active: formToggle1 }"
        >
          Connexion
        </div>
        <div
          @click="toggleToSignup()"
          class="card__btn__signup"
          :class="{ btn_active: formToggle2 }"
        >
          Création de compte
        </div>
      </div>
      <div class="card__form">
        <div v-if="mode == 'create'" class="card__form__row">
          <input
            class="card__form__input"
            v-model="firstname"
            type="firstname"
            name="firstname"
            id="firstname"
            placeholder="Prénom"
            required
          />
          <p
            class="card__form__row__errorFormat"
            v-if="checkFirstname == 'invalideFirstname'"
          >
            Veuillez saisir votre prénom
          </p>
        </div>
        <div v-if="mode == 'create'" class="card__form__row">
          <input
            class="card__form__input"
            v-model="lastname"
            type="lastname"
            name="lastname"
            id="lastname"
            placeholder="Nom"
            required
          />
          <p
            class="card__form__row__errorFormat"
            v-if="checkLastname == 'invalideLastname'"
          >
            Veuillez saisir votre nom
          </p>
        </div>
        <div class="card__form__row">
          <input
            class="card__form__input"
            v-model="email"
            type="email"
            name="email"
            id="email"
            placeholder="Adresse mail"
            required
          />
          <p
            class="card__form__row__errorFormat"
            v-if="checkEmail == 'invalideEmail'"
          >
            Veuillez saisir votre Adresse mail
          </p>
        </div>
        <p
          class="card__form__error"
          v-if="mode == 'create' && status == 'error__create'"
        >
          L'adresse mail est déjà utilisé
        </p>
        <div class="card__form__row">
          <input
            class="card__form__input"
            v-model="password"
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            required
          />
          <p
            class="card__form__row__errorFormat"
            v-if="checkPassword == 'invalidePassword'"
          >
            Veuillez saisir un mot de passe au bon format!
          </p>
          <p
            class="card__form__row__errorFormat"
            v-if="regexPassword == 'invalideRegexPass'"
          >
            Le mot de passe doit faire au moins 8 caractères sans signes
            spéciaux.
          </p>
        </div>
        <p
          class="card__form__error"
          v-if="mode == 'login' && status == 'error_login'"
        >
          Adresse mail et / ou mot de passe non reconnu !
        </p>
        <div class="card__form__row">
          <button
            v-if="mode == 'create'"
            @click="createAccount()"
            class="card__form__submit button"
            :class="{ 'button--disabled': !filledFields }"
            :disabled="!filledFields"
            type="button"
          >
            <span v-if="status == 'loading'">Création en cours...</span>
            <span v-else>Créer mon compte</span>
          </button>
          <button
            v-else
            v-on:click="login()"
            class="card__form__submit button"
            :class="{ 'button--disabled': !filledFields }"
            :disabled="!filledFields"
            type="button"
          >
            Connexion
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LogSign",
  components: {},
  data() {
    return {
      formToggle1: true,
      formToggle2: false,
      mode: "login",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      checkFirstname: "",
      checkLastname: "",
      checkEmail: "",
      checkPassword: "",
      regexPassword: "",
    };
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.$router.push("/home");
      return;
    }
  },
  computed: {
    filledFields() {
      if (this.mode == "create") {
        if (
          this.firstname != "" &&
          this.lastname != "" &&
          this.email != "" &&
          this.password != ""
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    toggleToLogin() {
      this.mode = "login";
      this.formToggle1 = true;
      this.formToggle2 = false;
    },
    toggleToSignup() {
      this.mode = "create";
      this.formToggle1 = false;
      this.formToggle2 = true;
    },
    login() {
      const self = this;
      //La méthode "dispath" permet de propager notre action "login" dans le store avec un payload
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(
          function () {
            //On accède au router et on redirrige vers la route "home" avec la méthode "push"
            self.$router.push("/home");
          },
          function (error) {
            console.log(error);
          }
        );
    },
    createAccount() {
      const self = this;
      if (!this.firstname) {
        this.checkFirstname = "invalideFirstname";
      }
      if (!this.lastname) {
        this.checkLastname = "invalideLastname";
      }
      if (!this.email) {
        this.checkEmail = "invalideEmail";
      }
      if (!this.password) {
        this.checkPassword = "invalidePassword";
      } else if (!this.validateRegexPass(this.password)) {
        this.regexPassword = "invalideRegexPass";
      }
      if (
        this.firstname &&
        this.lastname &&
        this.email &&
        this.validateRegexPass(this.password)
      ) {
        this.$store
          .dispatch("createAccount", {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
          })
          .then(
            function () {
              self.login();
            },
            function (error) {
              console.log(error);
            }
          );
      }
    },
    validateRegexPass(password) {
      const regex = /^[a-zA-Z0-9éèêàîïôöûü.!_-]{8,}$/;
      return regex.test(password);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$primary_color: #ffd7d7;
$secondary_color: #fd2d01;
$tertiary_color: #013a01;
$tertiary_color--clear: #88ec88;
@mixin dimension($width, $height) {
  width: $width;
  height: $height;
}
@mixin flexbox($display, $justify, $align) {
  display: $display;
  justify-content: $justify;
  align-items: $align;
}
.header {
  @include dimension($width: 100%, $height: 5.5rem);
  box-shadow: 0 0.5rem 1.5rem $primary_color;
  &__img {
    height: 5rem;
  }
}
.title {
  margin: 3rem 0;
  color: $tertiary_color;
}
.card {
  &__btn {
    @include flexbox($display: flex, $justify: center, $align: center);
    @media screen and (max-width: 770px) {
      flex-direction: column;
    }
    &__login {
      margin-right: 1rem;
      padding: 1rem;
      cursor: pointer;
      font-size: 1.2rem;
    }
    &__login:hover {
      border-bottom: 0.2rem solid $tertiary_color;
      border-radius: 1rem;
      padding: 0.8rem;
      font-size: 1.2rem;
    }
    &__signup {
      margin-left: 1rem;
      padding: 1rem;
      cursor: pointer;
      font-size: 1.2rem;
    }
    &__signup:hover {
      border-bottom: 0.2rem solid $tertiary_color;
      border-radius: 1rem;
      padding: 0.8rem;
      font-size: 1.2rem;
    }
  }
  &__form {
    @include dimension($width: 50%, $height: 30rem);
    @media screen and (max-width: 770px) {
      width: 90%;
    }
    border: 0.1rem solid $secondary_color;
    margin: 1rem auto;
    border-radius: 1rem;
    box-shadow: 0 0 2rem $primary_color;
    &__input {
      margin: 1rem auto;
      font-size: 1rem;
      @include dimension($width: 80%, $height: 2rem);
    }
    &__input::placeholder {
      font-size: 1rem;
      font-weight: 600;
    }
    &__row {
      &__errorFormat {
        color: $secondary_color;
      }
    }
    &__submit {
      padding: 1rem;
      font-size: 1rem;
      @include dimension($width: 60%, $height: 2rem);
      @include flexbox($display: flex, $justify: center, $align: center);
      margin: 1rem auto;
      background-color: $tertiary_color;
      color: white;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }
}
.btn_active {
  background-color: $primary_color;
  border-radius: 1rem;
  font-weight: 600;
}
.button--disabled {
  opacity: 0.5;
}
</style>
