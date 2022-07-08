<script setup>
import { useStatisticsStore } from "@/store/Admin/EmployeeReport/GeneralStatistics";

const statisticStore = useStatisticsStore();

const options = {
  series: Object.values(statisticStore.chart),
  labels: Object.keys(statisticStore.chart),
  legend: {
    show: true,
    position: "bottom",
    fontSize: "15px",
  },
};
</script>
<template>
  <apexchart
    type="pie"
    :options="options"
    :series="Object.values(statisticStore.chart)"
  ></apexchart>
</template>
