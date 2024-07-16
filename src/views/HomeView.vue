<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { logs } from '@/main';

const router = useRouter();
const store = useUserStore();

const { userCredentials } = storeToRefs(store);
const { authToken } = userCredentials.value;

const showLogs = ref(false);

onBeforeMount(() => {
  if (!authToken) {
    router.push({ path: '/welcome' });
  }
});
</script>

<template>
  <main class="container d-flex flex-column justify-center align-center gap-32">
    <img alt="Uluky logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <h1>Admin panel</h1>

    <button class="btn" @click="showLogs = true">Show logs</button>

    <ul v-if="showLogs">
      <li v-for="(item, index) in logs" :key="index">
        {{ JSON.stringify(item) }}
      </li>
    </ul>
  </main>
</template>
