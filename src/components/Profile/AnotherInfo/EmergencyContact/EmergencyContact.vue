<script setup>
// import ProfileApiService from "@/core/services/ApiServices/ProfileApiService";
import { useProfileStore } from "@/store/Profile";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { reactive, ref } from "vue";
import { mask } from "maska";
const profileApi = useProfileApi();
const profileStore = useProfileStore();
const isLoading = ref(false);
const form = reactive({
  full_name: null,
  phone: null,
});

const add = () => {
  isLoading.value = true;
  profileApi
    .addEmergencyContact(profileStore.profile.id, form)
    .then(() => {
      form.full_name = null;
      form.phone = null;
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <div class="row">
    <Form @submit="add()">
      <div class="d-flex flex-stack align-items-center gap-3">
        <Input
          v-model="form.full_name"
          :label="$t('fullName')"
          name="full_name"
          rules="required|max:255"
          mainClass="col-sm-4 mb-4"
        />
        <Input
          v-model="form.phone"
          :label="$t('phone')"
          name="phone"
          rules="required"
          :isMask="true"
          mask="+90(###) ### ## ##"
          mainClass="col-sm-4 mb-4"
        />
        <Button
          :isLoading="isLoading"
          text="add"
          loadingText="adding"
          icon="fas fa-floppy-disk"
        />
      </div>
    </Form>
  </div>
  <div class="row my-6">
    <table class="table table-row-dashed table-row-gray-300 gy-7">
      <thead>
        <tr class="fw-bolder text-gray-800">
          <th>{{ $t("fullName") }}</th>
          <th>{{ $t("phone") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in profileStore.profile.emergency_contact"
          :key="item.id"
        >
          <td>{{ item.full_name }}</td>
          <td>{{ mask(item.phone, "+90(###) ### ## ##") }}</td>
          <td>
            <Button
              color="danger"
              icon="fas fa-trash"
              size="sm"
              @handleClick="
                profileApi.deleteEmergencyContact(
                  profileStore.profile.id,
                  item.id
                )
              "
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
