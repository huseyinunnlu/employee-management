<script setup>
import { useAbsenceReportStore } from "@/store/Admin/AbsenceReport/AbsenceReport";
import { watch, ref, computed } from "vue";
import { useApiDataStore } from "@/store/Api/ApiData";

const apiDataStore = useApiDataStore();
const absenceReportStore = useAbsenceReportStore();
const selectedUsers = ref([]);
const typeTitle = ref();
watch(
  absenceReportStore.form,
  (value) => {
    getUsersById(value.users);
    getTypeTitle(value.type_id);
  },
  { deep: true }
);

const getUsersById = (ids) => {
  selectedUsers.value = absenceReportStore.addUser.filter((item) =>
    ids.includes(item.user_id)
  );
};

const getTypeTitle = (id) => {
  const title = apiDataStore.absenceTypes.find((item) => {
    return item.id == id;
  });
  typeTitle.value = title ? title.title : null;
};

const formattedDates = computed(() => {
  const date = absenceReportStore.form.date;
  let start_date = null;
  let end_date = null;
  if (!date) {
    return;
  }

  return `${date[0].replaceAll("-", ".")} - ${date[1].replaceAll("-", ".")}`;
});

const formattedTimes = computed(() => {
  let start_time = absenceReportStore.form.start_time;
  let end_time = absenceReportStore.form.end_time;

  return `${start_time.slice(0, 2)}:${start_time.slice(
    2,
    4
  )} - ${end_time.slice(0, 2)}:${end_time.slice(2, 4)}`;
});
</script>
<template>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("absenceType") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">{{ typeTitle }}</span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("date") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark" v-if="absenceReportStore.form.date">{{
        formattedDates
      }}</span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("time") }}: </label>
    <div class="col-lg-8">
      <span
        class="fw-bolder text-dark"
        v-if="
          absenceReportStore.form.start_time && absenceReportStore.form.end_time
        "
        >{{ formattedTimes }}</span
      >
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("status") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">{{
        $t(absenceReportStore.form.status)
      }}</span>
    </div>
  </div>

  <div class="row d-flex flex-column mt-4">
    <h4 class="my-3">{{ $t("selectedUsers") }}</h4>
    <table
      class="table table-hover table-rounded table-striped border gy-7 gs-7"
    >
      <thead>
        <tr>
          <th>{{ $t("fullName") }}</th>
          <th>{{ $t("role") }}</th>
          <th>{{ $t("company") }}</th>
          <th>{{ $t("department") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in selectedUsers" :key="item.user_id">
          <td>{{ item.full_name }}</td>
          <td>
            <CBadge color="success">{{ item.role.role }} </CBadge>
          </td>
          <td>{{ item.company }}</td>
          <td>{{ item.department }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
