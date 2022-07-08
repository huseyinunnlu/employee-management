<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { te, t } = useI18n();
const props = defineProps({
  color: { type: String, default: "success" },
  size: { type: String },
  divClass: { type: String, defaut: "text-center" },
  text: { type: String, Number, default: "" },
  loadingText: { type: String, Number, default: "" },
  icon: { type: String },
  isLoading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  spinner: { type: Boolean, default: true },
  type: { type: String, default: "submit" },
});

const buttonClass = computed(() => {
  return {
    "btn-sm": props.size == "sm",
    "text-light": true,
  };
});

const buttonIcon = computed(() => {
  return props.icon;
});

const disabled = computed(() => {
  return props.isLoading || props.disabled;
});

const buttonText = computed(() => {
  const normalText = te(props.text) && props.text ? t(props.text) : props.text;
  const loadingText =
    te(props.loadingText) && props.loadingText
      ? t(props.loadingText)
      : props.loadingText;
  return props.isLoading ? loadingText : normalText;
});
</script>
<template>
  <div :class="props.divClass">
    <button
      @click="disabled ? '' : $emit('handleClick')"
      :class="[buttonClass, `btn btn-${props.color}`]"
      :type="type"
      :disabled="disabled"
    >
      <i
        class="mr-2"
        :class="buttonIcon"
        v-if="props.icon && !props.isLoading"
      ></i>
      {{ buttonText }}
      <span
        class="spinner-border spinner-border-sm align-middle ms-2"
        v-if="isLoading"
      ></span>
    </button>
  </div>
</template>
