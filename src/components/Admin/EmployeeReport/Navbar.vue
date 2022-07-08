<template>
  <div class="d-flex overflow-auto">
    <ul class="nav" style="height: auto">
      <!--begin::Nav item-->
      <li class="nav-item text-dark">
        <router-link
          :to="{
            name: 'general-statistics',
          }"
          class="nav-link me-2"
          active-class="text-success border-bottom border-2 border-success"
        >
          {{ $t("generalStatistics") }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
