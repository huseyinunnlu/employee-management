<script setup>
import { defineProps, computed, defineEmits, watch } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { useCurrencyInput } from "vue-currency-input";

const { inputRef, rawValue, setValue } = useCurrencyInput(props.options);

const props = defineProps({
  modelValue: {},
  name: { type: String, required: true },
  label: { type: String, default: "" },
  rules: { type: String, default: "" },
  inline: { type: Boolean, default: true },
  showLabel: { type: Boolean, default: true },
  inputClass: { type: String, default: "form-control form-control-solid" },
  divClass: { type: String, default: "" },
  labelClass: { type: String, default: "form-label mb-3 fw-bold" },
  mainClass: { type: String, default: "form-group row my-4" },
  placeholder: { type: String, required: false },
  options: {
    default: {
      currency: "TRY",
    },
  },
  translateLabel: { type: Boolean, default: true },
  readonly: { type: Boolean, default: false },
  show: { type: Boolean, default: true },
});

const modelValue = computed(() => {
  return props.modelValue;
});

watch(
  modelValue,
  (value) => {
    setValue(value);
  },
  { immediate: true },
  { deep: true }
);
</script>

<template>
  <div :class="mainClass">
    <label v-if="showLabel" :class="labelClass" :for="name"
      >{{ $te(label) && translateLabel ? $t(label) : label }}
      <i
        v-if="rules.split('|').indexOf('required') > -1"
        class="fas fa-star-of-life text-danger"
        style="font-size: 8px; align-self: center"
      ></i
    ></label>
    <Field
      v-model="rawValue"
      :label="$te(label) && translateLabel ? $t(label) : label"
      :name="name"
      :rules="rules"
      v-slot="{ field, value }"
    >
      <input
        ref="inputRef"
        :class="inputClass"
        v-bind="field"
        :value="value"
        :readonly="readonly ? true : false"
      />
      <div class="validation-error">
        <ErrorMessage :name="name" />
      </div>
    </Field>
  </div>
</template>
<style lang="scss" scoped>
.validation-error {
  font-size: 0.8rem;
  color: #df4759;
  margin: 7px 0;
}
</style>
