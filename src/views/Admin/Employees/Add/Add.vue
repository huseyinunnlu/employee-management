<script setup>
import Add from "@/components/Admin/Employees/Add/Add.vue";
import Sidebar from "@/components/Admin/Employees/Add/Sidebar.vue";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import { useApiData } from "@/store/ApiServices/ApiData";

const apiData = useApiData();
onMounted(async () => {
  await apiData.getMusteris();
  await apiData.getRoles();
});
</script>
<template>
  <div class="row">
    <div class="col-md-3">
      <div class="card" style="min-height: 200px">
        <Sidebar />
      </div>
    </div>
    <div class="col-md-9">
      <div class="card">
        <div class="card-header">
          <div
            class="card-title d-flex justify-content-between align-items-center"
          >
            <h4>
              {{
                $t($route.name == "employee-edit" ? "editAttr" : "addAttr", {
                  attr: $t("employee"),
                })
              }}
            </h4>
            <div class="d-flex gap-2">
              <router-link
                class="btn btn-info btn-sm text-light"
                :to="{ name: 'employees' }"
              >
                <i class="fas fa-arrow-left"></i>
                {{ $t("employeeList") }}
              </router-link>
              <button
                class="btn btn-info btn-sm text-light"
                @click="$router.go(-1)"
              >
                <i class="fas fa-arrow-left"></i>
                {{ $t("goBack") }}
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <Add />
        </div>
      </div>
    </div>
  </div>
</template>
