<template>
  <div>
    <div class="card">
      <div class="card__info">
        <img
          v-if="getUserAccount.profil"
          class="card__info__img"
          :src="getUserAccount.profil"
          :alt="getUserAccount.firstname"
        />
        <img
          v-else
          class="card__info__img"
          src="../assets/avatar_default.png"
          alt="default_avatar"
        />
        <p class="card__info__name">
          {{ getUserAccount.firstname }} {{ getUserAccount.lastname }}
        </p>
        <p class="card__info__email">{{ getUserAccount.email }}</p>
      </div>
      <form class="card__form form" v-on:submit.prevent="modifyAccount()">
        <div class="card__form__row">
          <input
            class="card__form__input"
            v-model="firstname"
            type="firstname"
            name="firstname"
            id="firstname"
            placeholder="Prénom"
          />
        </div>
        <div class="card__form__row">
          <input
            class="card__form__input"
            v-model="lastname"
            type="lastname"
            name="lastname"
            id="lastname"
            placeholder="Nom"
          />
        </div>
        <div class="card__form__row">
          <label class="card__form__row__label" for="file"
            >photo de profil :</label
          >
          <input
            class="card__form__input"
            type="file"
            name="file"
            id="file"
            @change="uploadImage"
          />
        </div>

        <img
          v-if="this.imageUrl"
          class="card__form__uploadImg"
          :src="this.imageUrl"
          alt="upload Image"
        />

        <p
          class="card__form__row__errorFormat"
          v-if="checkfields == 'invalidFields'"
        >
          Veuillez remplir au moins les champs nom et prénom!
        </p>

        <div class="card__form__button">
          <button type="submit" class="card__form__button__modify btn m-1">
            Modifier mes informations
          </button>
          <button
            type="reset"
            @click="cancelModifyAccount()"
            class="card__form__button__cancel btn m-1"
          >
            Annuler la modification
          </button>
          <button
            @click="modalActive = true"
            class="card__form__button__delete btn m-1"
          >
            Supprimer mon compte
          </button>
        </div>
      </form>
      <modal-account-delete
        v-if="modalActive"
        @delete="deleteAccount()"
        @cancel="modalActive = false"
      ></modal-account-delete>
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import ModalAccountDelete from "./ModalAccountDelete.vue";

export default {
  components: { ModalAccountDelete },
  name: "SettingAccount",
  data() {
    return {
      firstname: "",
      lastname: "",
      image: "",
      imageUrl: null,
      user_id: this.$store.getters.getUser.userId,
      checkfields: "",
      profil: this.$store.getters.getProfil,
      modalActive: false,
    };
  },
  computed: {
    getUserAccount() {
      return this.$store.getters.getUserAccount;
    },
  },
  methods: {
    uploadImage(event) {
      const file = event.target.files[0];
      this.image = file;
      this.imageUrl = URL.createObjectURL(file);
    },
    cancelModifyAccount() {
      this.imageUrl = null;
      this.$emit("reload");
    },
    modifyAccount() {
      if (this.firstname == "" || this.lastname == "") {
        this.checkfields = "invalidFields";
      } else {
        const formData = new FormData();
        formData.append("profil", this.image);
        formData.append("firstname", this.firstname);
        formData.append("lastname", this.lastname);
        axios
          .put(`/auth/accounts/${this.user_id}`, formData)
          .then((res) => {
            console.log(res);
            this.$emit("reload");
          })
          .catch((error) => console.log(error));
      }
    },
    deleteAccount() {
      const self = this;
      axios
        .delete(`/auth/accounts/${this.user_id}`)
        .then((res) => {
          console.log(res);
          self.$store.commit("USER_LOGOUT");
          self.$router.push("/");
        })
        .catch((error) => console.log(error));
    },
  },
  created() {
    return this.$store.dispatch("getUserInfos");
  },
};
</script>

<style lang="scss" scoped>
$primary_color: #ffd7d7;
$secondary_color: #fd2d01;
$tertiary_color: #013a01;
$tertiary_color--clear: #b9fdb9ed;
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
  width: 85%;
  padding: 0.5rem;
  @media screen and (max-width: 770px) {
    width: 95%;
  }
  border: 0.1rem solid $secondary_color;
  margin: 1rem auto;
  border-radius: 1rem;
  box-shadow: 0 0 2rem $primary_color;
  &__info {
    margin: 0.5rem auto;
    &__img {
      width: 9rem;
      border-radius: 50%;
    }
    &__name {
      margin-top: 0.5rem;
      font-weight: 600;
      font-size: 1.5rem;
      font-family: "Times New Roman", Times, serif;
      font-style: italic;
    }
    &__email {
      font-weight: 600;
      font-size: 1.5rem;
      font-family: "Times New Roman", Times, serif;
    }
  }
  &__form {
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
      margin: 0.5rem auto;
      &__label {
        display: block;
      }
      &__errorFormat {
        color: $secondary_color;
      }
    }

    &__uploadImg {
      border: 2px solid $tertiary_color;
      border-radius: 50%;
      width: 50%;
    }

    &__button {
      @include flexbox($display: flex, $justify: center, $align: center);
      @media screen and (max-width: 770px) {
        flex-direction: column;
      }
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
