<script setup>
import { ref, provide } from 'vue';
import { onClickOutside } from '@vueuse/core';

defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['modal-close']);
const close = () => emit('modal-close');

provide('Dialog', { close });

const target = ref(null);
onClickOutside(target, () => emit('modal-close'));

</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" ref="target">
        <div class="modal-header">
          <slot name="header">default modal content</slot>
        </div>
        <div class="modal-body">
          <slot name="content">default modal content</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(22, 22, 22, 0.9);
}

.modal-container {
  width: 90%;
  max-width: 380px;
  margin: 150px auto;
  padding: 16px 24px;
  background-color: #3b3b3b;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(22, 22, 22, 0.33);
}

.modal-header {
  margin-bottom: 24px;
}
</style>