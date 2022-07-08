<template>
  <div class="d-flex mb-4">
    <ul
      class="nav nav-stretch nav-line-tabs overflow-auto nav-line-tabs-2x border-transparent fw-bolder flex-nowrap"
    >
      <!--begin::Nav item-->
      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'company-info',
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
            name: 'company-edit',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link"
          active-class="active text-success border-bottom border-2 border-success"
        >
          <i class="fas fa-pen"></i> {{ $t("edit") }}
        </router-link>
      </li>

      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'company-employees',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link"
          active-class="active text-success border-bottom border-2 border-success"
        >
          <i class="fas fa-user"></i> {{ $t("employees") }}
        </router-link>
      </li>

      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'company-managers',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link"
          active-class="active text-success border-bottom border-2 border-success"
        >
          <i class="fas fa-user-lock"></i> {{ $t("companyManagers") }}
        </router-link>
      </li>
      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'company-inventories',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link"
          active-class="active text-success border-bottom border-2 border-success"
        >
          <i class="fas fa-box"></i> {{ $t("inventories") }}
        </router-link>
      </li>
      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'company-inventory-types',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link"
          active-class="active text-success border-bottom border-2 border-success"
        >
          <i class="fas fa-box"></i> {{ $t("inventoryTypes") }}
        </router-link>
      </li>
      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'company-expense-types',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link"
          active-class="active text-success border-bottom border-2 border-success"
        >
          <i class="fas fa-clipboard"></i> {{ $t("expenseTypes") }}
        </router-link>
      </li>
      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'company-departments',
            params: {
              id: $route.params.id,
            },
          }"
          class="nav-link"
          active-class="active text-success border-bottom border-2 border-success"
        >
          <i class="fas fa-user"></i> {{ $t("departments") }}
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
