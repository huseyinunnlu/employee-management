<script setup>
import { useProfileStore } from "@/store/Profile";
import { reactive, ref } from "vue";
import { useAuthStore } from "@/store/Auth";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();
const profile = useProfileStore().profile;
const profileApi = useProfileApi();
const email = ref(profile.contact_info.email || null);
const isLoading = ref(false);
const passwordIsLoading = ref(false);
const form = reactive({
  current_password: null,
  password: null,
  password_confirmation: null,
});
const updateEmail = () => {
  isLoading.value = true;
  profileApi.updateEmail(profile.id, email.value).finally(() => {
    isLoading.value = false;
  });
};

const updatePassword = () => {
  passwordIsLoading.value = true;
  profileApi
    .updatePassword(profile.id, form)
    .then(() => {
      form.current_password = null;
      form.password = null;
      form.password_confirmation = null;
    })
    .finally(() => {
      passwordIsLoading.value = false;
    });
};
</script>

<template>
  <div
    class="row mb-5"
    v-if="!authStore.user.perms.can_edit_email || authStore.role === 1"
  >
    <h4 class="card-title mb-3">
      {{ $t("accountInfo") }}
    </h4>
    <Form @submit="updateEmail()">
      <Input
        v-model="email"
        name="email"
        :label="$t('email')"
        rules="required|email|max:255"
        mainClass="col-md-8 mb-3"
      />
      <Button
        :isLoading="isLoading"
        text="update"
        loadingText="updating"
        icon="fas fa-floppy-disk"
      />
    </Form>
  </div>
  <h4 class="card-title mb-3">{{ $t("changePassword") }}</h4>
  <Form @submit="updatePassword()">
    <div class="row mb-7">
      <div class="col-md-6">
        <Input
          v-model="form.current_password"
          :label="$t('currentPassword')"
          name="current_password|max:255"
          rules="required"
          inputType="password"
        />
      </div>
      <div class="col-md-6">
        <Input
          v-model="form.password"
          :label="$t('newPassword')"
          name="new_password"
          :rules="`required|min:6|max:30|is_not:${form.current_password}`"
          inputType="password"
        />
        <Input
          v-model="form.password_confirmation"
          :label="$t('reEnterNewPassword')"
          name="re_enter_new_password"
          :rules="`required|min:6|max:30|confirmed:${form.password}`"
          inputType="password"
        />
      </div>
      <Button
        :isLoading="passwordIsLoading"
        text="changePassword"
        loadingText="updating"
        icon="fas fa-floppy-disk"
      />
    </div>
  </Form>
</template>
