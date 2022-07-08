<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const slug = route.params.slug;
</script>
<template>
  <div class="d-flex">
    <ul
      class="nav nav-stretch overflow-auto nav-line-tabs nav-line-tabs-2x border-transparent fw-bolder flex-nowrap"
    >
      <!--begin::Nav item-->
      <li class="nav-item text-dark">
        <router-link
          :to="{ name: 'profile-index', params: { slug: slug } }"
          class="nav-link me-6"
          active-class="text-success border-bottom border-2 border-success"
        >
          {{ $t("myProfile") }}
        </router-link>
      </li>
      <li class="nav-item text-dark">
        <router-link
          :to="{ name: 'profile-account-info', params: { slug: slug } }"
          class="nav-link me-6"
          active-class="text-success border-bottom border-2 border-success"
        >
          {{ $t("accountInfo") }}
        </router-link>
      </li>
      <li class="nav-item text-dark">
        <router-link
          :to="{ name: 'profile-personal-info', params: { slug: slug } }"
          class="nav-link me-6"
          active-class="text-success border-bottom border-2 border-success"
        >
          {{ $t("personalInfo") }}
        </router-link>
      </li>
      <li class="nav-item text-dark">
        <router-link
          :to="{ name: 'profile-another-info', params: { slug: slug } }"
          class="nav-link me-6"
          active-class="text-success border-bottom border-2 border-success"
        >
          {{ $t("anotherInfo") }}
        </router-link>
      </li>

      <li class="nav-item text-dark">
        <router-link
          :to="{ name: 'profile-debits', params: { slug: slug } }"
          class="nav-link me-6"
          active-class="text-success border-bottom botrder-2 border-success"
        >
          {{ $t("debit") }}
        </router-link>
      </li>

      <li class="nav-item text-dark">
        <router-link
          :to="{ name: 'profile-documents', params: { slug: slug } }"
          class="nav-link me-6"
          active-class="text-success border-bottom botrder-2 border-success"
        >
          {{ $t("documents") }}
        </router-link>
      </li>
      <li class="nav-item text-dark">
        <router-link
          :to="{ name: 'profile-absences', params: { slug: slug } }"
          class="nav-link me-6"
          active-class="text-success border-bottom botrder-2 border-success"
        >
          {{ $t("absences") }}
        </router-link>
      </li>
      <li class="nav-item text-dark">
        <router-link
          :to="{ name: 'profile-reports', params: { slug: slug } }"
          class="nav-link me-6"
          active-class="text-success border-bottom botrder-2 border-success"
        >
          {{ $t("reports") }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.nav-link {
  color: #999;
  &:hover {
    color: #d7d7d7;
  }
}
</style>
