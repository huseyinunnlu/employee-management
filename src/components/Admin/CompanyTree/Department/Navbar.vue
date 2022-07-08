<template>
  <div class="d-flex mb-4">
    <ul
      class="nav nav-stretch overflow-auto nav-line-tabs nav-line-tabs-2x border-transparent fw-bolder flex-nowrap"
    >
      <!--begin::Nav item-->
      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'department-info',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link"
          active-class="active text-success border-bottom border-2 border-success"
        >
          {{ $t("generalInfo") }}
        </router-link>
      </li>
      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'department-edit',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link"
          active-class="active text-success border-bottom border-2 border-success"
        >
          <i class="fas fa-pen me-2"></i> {{ $t("edit") }}
        </router-link>
      </li>
      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'department-employees',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link"
          active-class="active text-success border-bottom border-2 border-success"
        >
          <i class="fas fa-user me-2"></i> {{ $t("employees") }}
        </router-link>
      </li>
      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'department-positions',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link"
          active-class="active text-success border-bottom border-2 border-success"
        >
          <i class="fas fa-users me-2"></i> {{ $t("positions") }}
        </router-link>
      </li>
      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'department-managers',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link"
          active-class="active text-success border-bottom border-2 border-success"
        >
          <i class="fas fa-users me-2"></i> {{ $t("departmentManagers") }}
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
