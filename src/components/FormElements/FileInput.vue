<script setup>
import { ref, watch, defineProps, computed } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { mask } from "maska";

const emit = defineEmits(["handleUpdate"]);

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: "" },
  translateLabel: { type: Boolean, default: true },
  showLabel: { type: Boolean, default: true },
  rules: { type: String, default: "" },
  inline: { type: Boolean, default: false },
  inputType: { type: String, default: "text" },
  inputClass: { type: String, default: "form-control form-control-solid" },
  divClass: { type: String, default: "col-sm-9" },
  labelClass: { type: String, default: "form-label mb-3 fw-bold" },
  mainClass: { type: String, default: "form-group row my-4" },
  placeholder: { type: String, required: false },
  show: { type: Boolean, default: true },
  multiple: { type: Boolean, default: false },
});

const updateInput = (event) => {
  const file = props.multiple === true ? event.value : event.value[0];
  emit("handleUpdate", file);
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
      ></i>
    </label>
    <Field
      :label="$te(label) && translateLabel ? $t(label) : label"
      :name="name"
      as="div"
      :class="mainClass"
      :rules="rules"
      v-slot="{ handleChange, handleBlur, field }"
    >
      <div :class="inline ? divClass : ''">
        <input
          :class="inputClass"
          type="file"
          :multiple="multiple ? true : false"
          :id="name"
          ref="myFiles"
          :placeholder="placeholder"
          @change="handleChange, updateInput(field)"
          @blur="handleBlur"
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
