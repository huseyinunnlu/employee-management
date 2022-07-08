<script setup>
import { useExpenseApi } from "@/store/ApiServices/ExpenseApi";
import { useApiDataStore } from "@/store/Api/ApiData";
import { ref, defineProps, watch, computed, reactive, defineEmits } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const props = defineProps(["selectedData", "showModal"]);
const isReady = ref(false);
const isLoading = ref(false);
const apiStore = useApiDataStore();
const expenseApi = useExpenseApi();
const selectedData = computed(() => {
  return props.selectedData;
});

const emit = defineEmits(["closeModal"]);

const form = reactive({
  type_id: null,
  date: null,
  price: null,
  desc: null,
  file: null,
});

const preview = ref(null);

const changeFile = (data) => {
  form.file = data;
  preview.value = URL.createObjectURL(data);
};

const setData = (data) => {
  form.type_id = data.type_id;
  form.date = data.date;
  form.price = data.price;
  form.desc = data.desc;
  form.file = data.file;
};

watch(
  selectedData,
  async (value) => {
    if (value) {
      await setData(value);
      isReady.value = true;
    }
  },
  { immediate: true }
);

const update = () => {
  isLoading.value = true;
  expenseApi
    .updateExpenseLine(
      props.selectedData.expense_id,
      props.selectedData.id,
      form,
      route.name == "expense-line" ? true : false
    )
    .finally(() => {
      emit("closeModal");
      isLoading.value = false;
    });
};
</script>
<template>
  <CModal :visible="props.showModal" @close="$emit('closeModal')">
    <CModalHeader>
      <CModalTitle>{{
        $t("editAttr", { attr: $t("expenseLine") })
      }}</CModalTitle>
    </CModalHeader>
    <Form @submit="update">
      <CModalBody>
        <div v-if="isReady">
          <Select
            v-model="form.type_id"
            name="type_id"
            :label="$t('expenseType')"
            rules="required"
            :inline="false"
            :options="apiStore.expenseTypes"
            mainClass="mb-4"
          />
          <DateInput
            v-model="form.date"
            :label="$t('expenseDate')"
            name="date"
            rules="required"
            :inline="false"
            mainClass="mb-4"
          />
          <CurrencyInput
            v-model="form.price"
            :label="$t('expensePrice')"
            name="expense_price"
            rules="required|max:15"
            :inline="false"
            mainClass="mb-4"
          />

          <Textarea
            v-model="form.desc"
            :label="$t('desc')"
            name="desc"
            rules="max:500"
            :inline="false"
            mainClass="mb-4"
          />

          <div class="col-sm-12 my-2 border py-3" v-if="form.file">
            <span class="d-flex align-items-center text-dark fw-bold fs-6 px-3">
              <a :href="preview || form.file" target="__blank" class="me-4">
                {{ $t("seeFile") }}
              </a>
              <i
                class="fas fa-times text-danger cursor-pointer"
                @click="(form.file = null), (preview = null)"
              ></i>
            </span>
          </div>

          <FileInput
            :label="$t('file')"
            name="file"
            :inline="false"
            @handleUpdate="changeFile"
            mainClass="mb-4"
            rules="size:2048|mimes:png,jpg,jpeg,bmp,webp,pdf,doc,docx,slsx"
          />
        </div>
        <div class="text-center align-items-center py-5" v-else>
          <CSpinner color="success" />
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="$emit('closeModal')">
          Close
        </CButton>
        <Button
          :isLoading="isLoading"
          text="update"
          loadingText="updating"
          icon="fas fa-floppy-disk"
        />
      </CModalFooter>
    </Form>
  </CModal>
</template>
