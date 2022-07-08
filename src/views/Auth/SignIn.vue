<script setup>
import { reactive, ref } from "vue";
import { useAuthApi } from "@/store/ApiServices/Auth";
const authApi = useAuthApi();
const isLoading = ref(false);
const form = reactive({
  email: null,
  password: null,
});

const signIn = () => {
  isLoading.value = true;

  authApi
    .signIn(form)
    .then(() => {
      form.email = null;
      form.password = null;
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>

<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <div class="container col-md-4">
      <div class="row align-content-center">
        <div class="row justify-content-center">
          <div class="bg-white rounded shadow-sm p-5">
            <!--begin::Form-->
            <Form class="form" @submit="signIn">
              <!--begin::Heading-->
              <div class="text-center mb-10">
                <!--begin::Title-->
                <h1 class="text-dark mb-3">{{ $t("signIn") }}</h1>
                <!--end::Title-->
              </div>
              <!--begin::Heading-->

              <!--begin::Input group-->
              <div class="fv-row mb-10">
                <!--begin::Label-->
                <Input
                  name="email"
                  :label="$t('email')"
                  v-model="form.email"
                  rules="required|email"
                  :inline="false"
                  input-class="form-control"
                  label-class="col-form-label"
                />
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-10">
                <!--begin::Label-->
                <Input
                  name="password"
                  :label="$t('password')"
                  v-model="form.password"
                  rules="required"
                  inputType="password"
                  :inline="false"
                  input-class="form-control"
                  label-class="col-form-label"
                />
              </div>

              <!--end::Input group-->

              <Button
                :isLoading="isLoading"
                divClass="text-center"
                text="signIn"
                loadingText="signingIn"
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>
