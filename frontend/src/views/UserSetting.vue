<template>
  <div>
    <header-comp></header-comp>
    <h1>USER SETTING</h1>
    <div class="card__form">
      <div class="card__form__row">
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
      <div class="card__form__row">
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
          Le mot de passe doit faire au moins 8 caractères sans signes spéciaux.
        </p>
      </div>
      <div class="card__form__button">
        <button
          @click="modifyAccount()"
          class="card__form__button__modify btn m-1"
        >
          Modifier mes informations
        </button>
        <button
          @click="cancelModifyAccount()"
          class="card__form__button__cancel btn m-1"
        >
          Annuler la modification
        </button>
        <button
          @click="deleteAccount()"
          class="card__form__button__delete btn m-1"
        >
          Supprimer mon compte
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComp from "../components/HeaderComp.vue";

export default {
  name: "UserSetting",
  data() {
    return {
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
  components: {
    HeaderComp,
  },
  methods: {
    cancelModifyAccount() {
      window.location.reload();
    },
    modifyAccount() {
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
    },
    validateRegexPass(password) {
      const regex = /^[a-zA-Z0-9éèêàîïôöûü.!_-]{8,}$/;
      return regex.test(password);
    },
    deleteAccount() {},
  },
};
</script>

<style lang="scss" scoped>
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
.card {
  &__form {
    @include dimension($width: 85%, $height: 30rem);
    @media screen and (max-width: 770px) {
      width: 95%;
    }
    border: 0.1rem solid $secondary_color;
    margin: 1rem auto;
    border-radius: 1rem;
    box-shadow: 0 0 2rem $primary_color;
    &__input {
      margin: 0.5rem auto;
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
    &__button {
      &__modify {
        background-color: $tertiary_color;
        color: white;
      }
      &__cancel {
        background-color: rgb(238, 202, 0);
        color: white;
      }
      &__delete {
        background-color: $secondary_color;
        color: white;
      }
    }
  }
}
</style>
