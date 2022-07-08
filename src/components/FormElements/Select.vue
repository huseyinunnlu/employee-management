<style src="@vueform/multiselect/themes/default.css"></style>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import Multiselect from "@vueform/multiselect";
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import { useI18n } from "vue-i18n";
const { t, te } = useI18n();
const data = ref(props.modelValue);
const emit = defineEmits(["searchChange", "update:modelValue", "selected"]);
const props = defineProps({
  modelValue: {},
  name: { type: String, required: true },
  label: { type: String, default: "" },
  translateLabel: { type: Boolean, default: true },
  translateOption: { type: Boolean, default: true },
  rules: { type: String, default: "" },
  inline: { type: Boolean, default: false },
  showLabel: { type: Boolean, default: true },
  divClass: { type: String, default: "col-sm-9" },
  labelClass: { type: String, default: "form-label mb-3 fw-bold" },
  mainClass: { type: String, default: "form-group row my-4" },
  placeholder: { type: String, required: false },
  errorMessage: { type: Array, required: false },
  autoComplete: { type: Boolean, default: false },
  //select props
  options: { type: Array, default: [] },
  model: { type: String, default: "single" },
  searchable: { type: Boolean, default: true },
  trackBy: { type: String, default: "title" },
  disabled: { type: Boolean, default: false },
  selectLabel: { type: String, default: "title" },
  valueProp: { type: String, default: "id" },
  customOption: { type: Boolean, default: false },
  customLabel: { type: Boolean, default: false },
});

const modelValue = computed(() => {
  return props.modelValue;
});

const gettedOptions = computed(() => {
  return props.options.map((item) => {
    return {
      id: item.id,
      title: props.translateOption
        ? te(item[props.selectLabel])
          ? t(item[props.selectLabel])
          : item[props.selectLabel]
        : item[props.selectLabel],
    };
  });
});

const updateInput = (event) => {
  emit("update:modelValue", event);
};

const changeSearch = (query) => {
  if (query.length > 3) {
    setTimeout(() => {
      emit("searchChange", query);
    }, 500);
  }
};

watch(
  modelValue,
  (value) => {
    data.value = value;
    if (value) {
      emit("selected", value);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div :class="mainClass">
    <label v-if="showLabel" :class="labelClass" :for="name"
      >{{ label }}
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
        <Multiselect
          v-model="data"
          v-bind="field"
          :value="value"
          :id="name"
          :valueProp="valueProp"
          :placeholder="placeholder"
          @change="updateInput"
          @search-change="changeSearch"
          :options="gettedOptions"
          :label="'title'"
          :model="model"
          :searchable="searchable"
          :trackBy="trackBy"
          :disabled="disabled"
          :autocomplete="autoComplete ? 'on' : 'off'"
          :noOptionsText="$t('noData')"
        >
          <template v-slot:singlelabel="{ value }" v-if="customLabel">
            <slot name="customLabel" :label="value"></slot>
          </template>

          <template v-slot:option="{ option }" v-if="customOption">
            <slot name="customOption" :option="option"></slot>
          </template>
        </Multiselect>
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
