<script setup>
import { ref, inject } from 'vue';
import {
  Form,
  Field,
  ErrorMessage,
} from 'vee-validate';
import { useUserStore } from '@/stores/user';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const Dialog = inject('Dialog');

const store = useUserStore();

const validationSchema = {
  email(value) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      return true;
    } else {
      return 'Please, use correct e-mail like myemail@gmail.com';
    }
  },
  firstName(value) {
    if (value && value.trim()) {
      return true;
    }
    return 'This field must be filled';
  },
  phone(value) {
    if (/^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/.test(value)) {
      return true;
    } else {
      return 'Please, use russian phone number like +7 (999) 999-00-00';
    }
  },
};

const loading = ref(false);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const register = async ({ firstName, lastName, phone, email }) => {
  loading.value = true;

  await sleep(2000);

  store.setUserData({ firstName, lastName, phone, email });
  await store.generatePassword();

  loading.value = false;

  Dialog.close();

  setTimeout(() => {
    toast('Successful registration', {
      autoClose: 2000,
      theme: 'dark',
    });
  }, 50);
};

const submit = (formFields) => {
  register(formFields);
};
</script>

<template>
   <div class="form_container">
    <Form @submit="submit" :validation-schema="validationSchema">
      <span class="form_label">First name *</span>
      <Field name="firstName" placeholder="Ivan" :disabled="loading" />
      <ErrorMessage name="firstName" />

      <span class="form_label">Last name</span>
      <Field name="lastName" placeholder="Ivanov" :disabled="loading" />

      <span class="form_label">Phone *</span>
      <Field name="phone" type="tel" v-mask="'+7 (###) ###-##-##'" placeholder="+7 (999) 999-00-00" :disabled="loading" />
      <ErrorMessage name="phone" />

      <span class="form_label">E-mail *</span>
      <Field name="email" type="email" placeholder="myemail@gmail.com" :disabled="loading" />
      <ErrorMessage name="email" />

      <button class="btn" :disabled="loading">
        <div v-if="loading" class="preloader"></div>
        <span v-else>Send form</span>
      </button>
    </Form>
   </div>
</template>
