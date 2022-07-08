<script setup>
import List from "@/components/Admin/EmployeeReport/GeneralStatistics/List.vue";
import Chart from "@/components/Admin/EmployeeReport/GeneralStatistics/Chart.vue";
import Filter from "@/components/Admin/EmployeeReport/GeneralStatistics/Filter.vue";
import { useStatisticApi } from "@/store/ApiServices/StatisticApi";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const statisticApi = useStatisticApi();
const route = useRoute();
const router = useRouter();
const filter = ref(route.query.filter || "distributionAge");
const isLoading = ref(true);
const routeChange = (value) => {
  router.replace({
    name: "general-statistics",
    query: { filter: value },
  });
};

onBeforeMount(() => {
  const query = route.query;

  if (!query.filter) {
    routeChange(filter.value);
    return;
  }

  statisticApi
    .getStatistics(query)
    .catch(() => {
      routeChange("distributionAge");
    })
    .finally(() => {
      isLoading.value = false;
    });
});

const changeFilter = () => {
  routeChange(filter.value);
};
</script>
<template>
  <div class="row">
    <div class="col-md-8">
      <div class="d-flex justify-content-between mb-4">
        <select
          class="form-select w-auto"
          aria-label="Select example"
          v-model="filter"
          @change="changeFilter"
        >
          <option value="distributionAge">
            {{ $t("distributionAge") }}
          </option>
          <option value="distributionGender">
            {{ $t("distributionGender") }}
          </option>
          <option value="distributionMarialStatus">
            {{ $t("distributionMarialStatus") }}
          </option>
          <option value="distributionDepartment">
            {{ $t("distributionDepartment") }}
          </option>
          <option value="workTime">{{ $t("workTime") }}</option>
          <option value="militaryStatus">{{ $t("militaryStatus") }}</option>
        </select>
        <Filter />
      </div>
      <List />
    </div>
    <div class="col-md-4">
      <div class="d-flex flex-column" v-if="!isLoading">
        <h2 class="text-center mb-3" v-if="$route.query.filter">
          {{ $t($route.query.filter) }}
        </h2>
        <Chart />
      </div>
    </div>
  </div>
</template>
