<script setup>
import { ref, watch, defineProps, computed } from "vue";
import { Field, ErrorMessage } from "vee-validate";
const props = defineProps({
  modelValue: { type: [String, Number], default: null },
  name: { type: String },
  label: { type: String, default: "" },
  translateLabel: { type: Boolean, default: true },
  rules: { type: String, default: "" },
  inline: { type: Boolean, default: false },
  showLabel: { type: Boolean, default: true },
  inputClass: { type: String, default: "form-control" },
  divClass: { type: String, default: "col-sm-9" },
  labelClass: { type: String, default: "form-label mb-3 fw-bold" },
  mainClass: { type: String, default: "form-group row" },
  placeholder: { type: String, required: false },
  readonly: { type: Boolean, default: false },
  show: { type: Boolean, default: true },
});
const data = ref(props.modelValue);

const value = computed(() => {
  return props.modelValue;
});

watch(
  value,
  (value) => {
    data.value = value;
  },
  { immediate: true }
);

const emit = defineEmits(["update:modelValue"]);

const updateInput = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div :class="mainClass" v-if="show">
    <label v-if="showLabel" :class="labelClass" :for="name"
      >{{ label }}
      <i
        v-if="rules.split('|').indexOf('required') > -1"
        class="fas fa-star-of-life text-danger"
        style="font-size: 8px; align-self: center"
      ></i>
    </label>
    <Field
      v-model="data"
      :label="$te(label) && translateLabel ? $t(label) : label"
      :name="name"
      :rules="rules"
      v-slot="{ value, field }"
    >
      <div :class="inline ? divClass : ''">
        <textarea
          :class="inputClass"
          :id="name"
          :value="value"
          :placeholder="placeholder"
          :readonly="readonly ? true : false"
          v-bind="field"
          @input="updateInput"
        >
        </textarea>
        <div class="validation-error">
          <ErrorMessage :name="name" />
        </div>
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
