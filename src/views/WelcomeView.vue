<script setup lang="ts">
import { ref } from 'vue';
import ModalWindow from '@/components/ModalWindow.vue';
import SignUpForm from '@/components/SignUpForm.vue';
import SignInForm from '@/components/SignInForm.vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const store = useUserStore();
const isSignUpModalOpened = ref(false);
const isSignInModalOpened = ref(false);

const { userCredentials } = storeToRefs(store);

const toggleSignUpModal = () => {
  isSignUpModalOpened.value = !isSignUpModalOpened.value;
};

const toggleSignInModal = () => {
  isSignInModalOpened.value = !isSignInModalOpened.value;
};
</script>

<template>
  <main class="container d-flex flex-column justify-center align-center gap-32">
    <img alt="Uluky logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <h1>Admin panel</h1>

    <h2>Please register to access our system. It's simple</h2>

    <section class="password_container" :class="{ hidden: !userCredentials.password }">
      <p>Your password is</p>
      <pre>{{ userCredentials.password }}</pre>
    </section>

    <section class="d-flex gap-32">
      <button class="btn" @click="toggleSignUpModal">Sign up</button>
      <button class="btn" @click="toggleSignInModal">Sign in</button>
    </section>

    <ModalWindow
      :isOpen="isSignUpModalOpened"
      @modal-close="toggleSignUpModal"
      name="first-modal"
    >
      <template #header>
        <h3>Sign up</h3>
      </template>
      <template #content>
        <SignUpForm />
      </template>
    </ModalWindow>

    <ModalWindow
      :isOpen="isSignInModalOpened"
      @modal-close="toggleSignInModal"
      name="first-modal"
    >
      <template #header>
        <h3>Sign in</h3>
      </template>
      <template #content>
        <SignInForm />
      </template>
    </ModalWindow>
  </main>
</template>
