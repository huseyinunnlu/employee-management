<script setup>
import { ref, watch, defineProps, computed } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import maska from "maska";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: { type: [String, Number], default: null },
  name: { type: String, required: true },
  label: { type: String, default: "" },
  translateLabel: { type: Boolean, default: true },
  inputType: { type: String, default: "text" },
  showLabel: { type: Boolean, default: true },
  rules: { type: String, default: "" },
  inline: { type: Boolean, default: false },
  inputClass: { type: String, default: "form-control" },
  divClass: { type: String, default: "col-sm-9" },
  labelClass: { type: String, default: "form-label mb-3 fw-bold" },
  mainClass: { type: String, default: "form-group row my-4" },
  placeholder: { type: String, required: false },
  readonly: { type: Boolean, default: false },
  show: { type: Boolean, default: true },
  isMask: { type: Boolean, default: false },
  mask: { type: String },
});
const data = ref(props.modelValue);

const value = computed(() => {
  return props.modelValue;
});

watch(value, (value) => {
  data.value = value;
});

const updateInput = (event) => {
  emit(
    "update:modelValue",
    props.isMask ? event.target.dataset.maskRawValue : event.target.value
  );
  data.value = props.isMask
    ? event.target.dataset.maskRawValue
    : event.target.value;
};
</script>

<template>
  <div :class="mainClass" v-if="show">
    <label v-if="showLabel" :class="labelClass" :for="name"
      >{{ $te(label) && translateLabel ? $t(label) : label }}
      <i
        v-if="rules.split('|').indexOf('required') > -1"
        class="fas fa-star-of-life text-danger"
        style="font-size: 8px; align-self: center"
      ></i
    ></label>
    <Field
      v-model="data"
      :label="$te(label) && translateLabel ? $t(label) : label"
      :name="name"
      :rules="rules"
      v-slot="{ value, field }"
    >
      <div :class="inline ? divClass : ''">
        <input
          :class="inputClass"
          :type="inputType"
          :id="name"
          :placeholder="placeholder"
          @input="updateInput"
          v-bind="field"
          :value="value"
          v-maska="isMask ? props.mask : ''"
          :readonly="readonly ? true : false"
        />
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
