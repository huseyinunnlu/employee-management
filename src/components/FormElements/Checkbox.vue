<script setup>
import { ref, watch, defineProps, computed } from "vue";
import { Field, ErrorMessage } from "vee-validate";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: { type: [Array, String, Number, Boolean], default: null },
  name: { type: String, required: true },
  label: { type: String, default: "" },
  translateLabel: { type: Boolean, default: true },
  dataValue: { type: [String, Number, Boolean], default: true },
  showLabel: { type: Boolean, default: true },
  rules: { type: String, default: "" },
  inline: { type: Boolean, default: false },
  inputClass: { type: String, default: "form-control form-control-solid" },
  labelClass: { type: String, default: "fw-bold form-label mb-3" },
  mainClass: { type: String, default: "form-group row my-4" },
  readonly: { type: Boolean, default: false },
  show: { type: Boolean, default: true },
});
const data = ref(props.modelValue);

const value = computed(() => {
  return props.modelValue;
});

watch(
  data,
  (value) => {
    emit("update:modelValue", value);
  },
  { immediate: true }
);
</script>

<template>
  <div :class="mainClass" v-if="show">
    <Field
      v-model="data"
      :label="$te(label) && translateLabel ? $t(label) : label"
      :name="name"
      type="checkbox"
      :rules="rules"
      :value="dataValue"
      v-slot="{ field }"
    >
      <label v-if="showLabel" :class="labelClass" :for="dataValue"
        >{{ $te(label) && translateLabel ? $t(label) : label }}
        <i
          v-if="rules.split('|').indexOf('required') > -1"
          class="fas fa-star-of-life text-danger"
          style="font-size: 8px; align-self: center"
        ></i>
        <input
          :class="inputClass"
          :id="dataValue"
          type="checkbox"
          v-bind="field"
          :value="dataValue"
      /></label>
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
