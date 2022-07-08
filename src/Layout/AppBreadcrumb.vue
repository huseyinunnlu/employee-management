<script setup>
import { onMounted, ref } from "vue";
import router from "@/router";
import { useI18n } from "vue-i18n";

const { t, te } = useI18n();
const breadcrumbs = ref();

const getBreadcrumbs = () => {
  return router.currentRoute.value.matched.map((route) => {
    return {
      active: route.path === router.currentRoute.value.fullPath,
      name: route.meta.breadcrumb
        ? te(route.meta.breadcrumb)
          ? t(route.meta.breadcrumb)
          : route.meta.breadcrumb || ""
        : "",
      path: `${router.options.history.base}${route.path}`,
    };
  });
};

router.afterEach(() => {
  breadcrumbs.value = getBreadcrumbs();
});

onMounted(() => {
  breadcrumbs.value = getBreadcrumbs();
});
</script>

<template>
  <CBreadcrumb class="d-md-down-none mb-0">
    <CBreadcrumbItem
      v-for="item in breadcrumbs"
      :key="item"
      :href="item.active ? '' : item.path"
      :active="item.active"
    >
      {{ item.name }}
    </CBreadcrumbItem>
  </CBreadcrumb>
</template>
