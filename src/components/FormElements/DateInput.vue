<script setup>
import { Field, ErrorMessage } from "vee-validate";
import { defineEmits, ref, watch, defineProps, computed } from "vue";

const props = defineProps({
  modelValue: {},
  name: { type: String, required: true },
  label: { type: String, default: "" },
  rules: { type: String, default: "" },
  inline: { type: Boolean, default: false },
  showLabel: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: "date" },
  inputClass: { type: String, default: "form-control" },
  divClass: { type: String, default: "col-sm-9" },
  labelClass: { type: String, default: "fw-bold form-label mb-3" },
  mainClass: { type: String, default: "form-group row my-4" },
  placeholder: { type: String, required: false },
  format: { type: String, default: "DD.MM.YYYY" },
  valueFormat: { type: String, default: "DD-MM-YYYY" },
  translateLabel: { type: Boolean, default: true },
  readonly: { type: Boolean, default: false },
  show: { type: Boolean, default: true },
});

const emit = defineEmits(["update:modelValue"]);
const data = ref(props.modelValue);

const modelValue = computed(() => {
  return props.modelValue;
});

watch(
  modelValue,
  (value) => {
    if (value) {
      if (props.type == "daterange") {
        data.value = [value[0], value[1]];
      } else {
        data.value = value;
      }
    } else {
      data.value = null;
    }
  },
  { immediate: true }
);

const updateInput = (event) => {
  emit("update:modelValue", event);
};
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
      v-model="data"
      :label="$te(label) && translateLabel ? $t(label) : label"
      :name="name"
      :rules="rules"
    >
      <div :class="inline ? divClass : ''">
        <el-date-picker
          v-model="data"
          :disabled="disabled"
          :type="type"
          :format="format"
          :value-format="valueFormat"
          :placeholder="placeholder"
          @change="updateInput"
          :readonly="readonly ? true : false"
          style="width: 100%; border: none; height: 39px"
        >
        </el-date-picker>

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
