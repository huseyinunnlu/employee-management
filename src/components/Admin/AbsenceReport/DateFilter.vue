<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const date = ref([route.query.start_date, route.query.end_date]);

const changeFilter = (value) => {
  let newQuery = route.query;

  newQuery["start_date"] = value ? value[0] : null;
  newQuery["end_date"] = value ? value[1] : null;

  const reversedKeys = Object.keys(newQuery).reverse();
  let newReversedQuery = {};
  reversedKeys.forEach((key) => {
    if (newQuery[key]) {
      newReversedQuery[key] = newQuery[key];
    }
  });

  router.replace({
    name: "absence-reports",
    query: newReversedQuery,
  });
};

watch(date, (value) => {
  changeFilter(value);
});
</script>

<template>
  <el-dropdown :hide-on-click="false">
    <button class="btn btn-info text-light">
      <i class="fas fa-filter"></i> {{ $t("selectDate") }}
    </button>
    <template #dropdown>
      <div class="card" style="width: 300px">
        <div class="card-header">
          <h5 class="card-title">
            {{ $t("filter") }}
          </h5>
        </div>
        <div class="card-body">
          <DateInput
            v-model="date"
            name="date"
            :label="$t('Select date')"
            type="daterange"
            range-seperator="to"
            mainClass="col-sm-12 mb-4"
            labelClass="mb-3 fw-bold fs-6"
            :inline="false"
            inputClass="w-auto"
            @input="changeFilter"
          />
        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-between">
            <button
              type="reset"
              class="btn btn-danger me-2 text-light"
              @click="$router.push({ name: 'absence-reports' })"
            >
              {{ $t("reset") }}
            </button>
          </div>
        </div>
        <!--end::Actions-->
      </div>
    </template>
  </el-dropdown>
</template>
