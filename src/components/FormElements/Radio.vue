<script setup>
import { ref, watch, defineProps, computed } from "vue";
import { Field, ErrorMessage } from "vee-validate";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: { type: [String, Number], default: null },
  name: { type: String, required: true },
  label: { type: String, default: "" },
  translateLabel: { type: Boolean, default: true },
  dataValue: { type: [String, Number], default: null },
  showLabel: { type: Boolean, default: true },
  rules: { type: String, default: "" },
  inline: { type: Boolean, default: false },
  inputClass: { type: String, default: "form-control form-control-solid" },
  divClass: { type: String, default: "col-sm-9" },
  labelClass: { type: String, default: "form-label mb-3 fw-bold" },
  mainClass: { type: String, default: "form-group row my-4" },
  readonly: { type: Boolean, default: false },
  show: { type: Boolean, default: true },
});
const data = ref(props.modelValue);

const value = computed(() => {
  return props.modelValue;
});

watch(data, (value) => {}, { immediate: true });

const changeData = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div :class="mainClass" v-if="show">
    <Field
      v-model="data"
      :label="$te(label) && translateLabel ? $t(label) : label"
      :name="name"
      type="radio"
      :rules="rules"
      :value="dataValue"
      v-slot="{ field }"
    >
      <div :class="inline ? divClass : ''">
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
            type="radio"
            v-bind="field"
            :value="dataValue"
            @input="changeData"
        /></label>
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
