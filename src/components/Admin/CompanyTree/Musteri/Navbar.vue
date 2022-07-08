<template>
  <div class="d-flex overflow-auto mb-4">
    <ul
      class="nav nav-stretch overflow-auto nav-line-tabs nav-line-tabs-2x border-transparent fw-bolder flex-nowrap"
      style="height: 50px"
    >
      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'musteri-info',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link me-6"
          active-class="text-success border-bottom border-2 border-success"
        >
          {{ $t("generalInfo") }}
        </router-link>
      </li>

      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'employeer-branch',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link me-6"
          active-class="text-success border-bottom border-2 border-success"
        >
          {{ $t("employeerBranch") }}
        </router-link>
      </li>

      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'musteri-company',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link me-6"
          active-class="text-success border-bottom border-2 border-success"
        >
          <i class="fas fa-briefcase me-2"></i> {{ $t("companies") }}
        </router-link>
      </li>

      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'musteri-employees',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link me-6"
          active-class="text-success border-bottom border-2 border-success"
        >
          <i class="fas fa-user me-2"></i> {{ $t("employees") }}
        </router-link>
      </li>

      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'musteri-edit',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link"
          active-class="text-success border-bottom border-2 border-success"
        >
          <i class="fas fa-pen me-2"></i> {{ $t("edit") }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.nav-link {
  color: #999;
  &:hover {
    color: #d7d7d7;
  }
}
</style>
