<script setup>
import SignOut from "./SignOut.vue";
import ChangeLanguage from "./ChangeLanguage.vue";
import { useAuthStore } from "@/store/Auth";

const authStore = useAuthStore();
</script>
<template>
  <el-dropdown trigger="click" size="large">
    <span class="el-dropdown-link">
      <CAvatar :src="authStore.user.photo" size="md" />
    </span>
    <template #dropdown>
      <el-dropdown-menu style="width: 250px">
        <CDropdownHeader class="fs-5 bg-light fw-semibold py-2">
          {{ $t("account") }}
        </CDropdownHeader>

        <router-link
          :to="{
            name: 'profile-index',
            params: {
              slug: authStore.user.slug,
            },
          }"
        >
          <CDropdownItem
            class="fw-semibold py-2 fs-6 d-flex gap-2 align-items-center"
          >
            <i class="fas fa-user"></i>
            {{ $t("profile") }}
          </CDropdownItem>
        </router-link>
        <SignOut />
        <ChangeLanguage />
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
