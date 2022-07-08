import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import router from "./router";
import i18n from "./core/plugins/i18n/i18n";
import Maska from "maska";
import Notifications from "@kyvg/vue3-notification";
import CoreuiVue from "@coreui/vue";
import CIcon from "@coreui/icons-vue";
import { iconsSet as icons } from "@/assets/icons";
import "element-plus/dist/index.css";
import VueApexCharts from "vue3-apexcharts";

import * as validate from "./core/plugins/vee-validate/vee-validate";

import ElementPlus from "element-plus";

import { Form } from "vee-validate";
import Input from "@/components/FormElements/Input.vue";
import FileInput from "@/components/FormElements/FileInput.vue";
import CurrencyInput from "@/components/FormElements/CurrencyInput.vue";
import DateInput from "@/components/FormElements/DateInput.vue";
import Checkbox from "@/components/FormElements/Checkbox.vue";
import Radio from "@/components/FormElements/Radio.vue";
import Select from "@/components/FormElements/Select.vue";
import Textarea from "@/components/FormElements/Textarea.vue";
import Button from "@/components/FormElements/Button.vue";
import Pagination from "@/components/Table/Pagination.vue";

const app = createApp(App);

app.use(createPinia());
app.use(Notifications);
app.use(validate);
app.use(i18n);
app.use(router);
app.use(Maska);
app.use(ElementPlus);
app.use(CoreuiVue);
app.use(VueApexCharts);

//components

app.provide("icons", icons);
app.component("CIcon", CIcon);
app.component("Form", Form);
app.component("Input", Input);
app.component("FileInput", FileInput);
app.component("CurrencyInput", CurrencyInput);
app.component("Checkbox", Checkbox);
app.component("Radio", Radio);
app.component("DateInput", DateInput);
app.component("Select", Select);
app.component("Textarea", Textarea);
app.component("Button", Button);
app.component("Pagination", Pagination);

app.mount("#app");
