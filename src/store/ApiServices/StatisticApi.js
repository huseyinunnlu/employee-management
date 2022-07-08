import { defineStore } from "pinia";
import router from "@/router";
import appAxios from "@/core/services/Api/AppAxios";
import { useStatisticsStore } from "../Admin/EmployeeReport/GeneralStatistics";
export const useStatisticApi = defineStore("satisticApi", {
  actions: {
    getStatistics(query) {
      const statisticStore = useStatisticsStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get("admin/reports/generalstatistics", { params: query })
          .then((response) => {
            if (response.data) {
              statisticStore.setData(response.data.data, "users");
              statisticStore.setData(response.data.meta.links, "pagination");
              statisticStore.setData(response.data.chart, "chart");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
  },
});
