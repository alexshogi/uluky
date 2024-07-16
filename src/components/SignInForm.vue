<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import {
  Form,
  Field,
  ErrorMessage,
} from 'vee-validate';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const Dialog = inject('Dialog');
const router = useRouter();

const store = useUserStore();
const { userData, userCredentials } = storeToRefs(store);

const { email } = userData.value;
const { password } = userCredentials.value;

const loading = ref(false);

const validationSchema = {
  email(value) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      return true;
    } else {
      return 'Please, use correct e-mail like myemail@gmail.com';
    }
  },
  password(value) {
    if (value === password) {
      return true;
    } else {
      return 'Incorrect password, maybe';
    }
  },
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const login = async () => {
  loading.value = true;

  await sleep(1000);

  store.generateToken();

  loading.value = false;

  Dialog.close();

  setTimeout(() => {
    toast('Successful login', {
      autoClose: 2000,
      theme: 'dark',
    });

    router.push({ path: '/' });
  }, 50);
};

const submit = (formFields) => {
  if (formFields.email !== email || formFields.password !== password) {
    toast('Wrong email or password', {
      autoClose: 2000,
      theme: 'dark',
    });

    return;
  }

  login({ email, password });
};
</script>

<template>
   <div class="form_container">
    <Form @submit="submit" :validation-schema="validationSchema">

      <span class="form_label">E-mail</span>
      <Field name="email" type="email" placeholder="myemail@gmail.com" :disabled="loading" />
      <ErrorMessage name="email" />

      <span class="form_label">Password</span>
      <Field name="password" type="password" :disabled="loading" />
      <ErrorMessage name="password" />

      <button class="btn" :disabled="loading">
        <div v-if="loading" class="preloader"></div>
        <span v-else>Send form</span>
      </button>
    </Form>
   </div>
</template>
