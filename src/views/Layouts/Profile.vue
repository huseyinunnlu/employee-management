<script setup>
import Navigation from "@/components/Profile/Navigation.vue";
import User from "@/components/Profile/User/User.vue";
import Photo from "@/components/Profile/User/Photo.vue";
import { useRoute, useRouter } from "vue-router";
import { checkObjectEmpty } from "@/core/helpers/ObjectHelpers";
import { onBeforeMount, onMounted, ref } from "vue";
import { useProfileStore } from "@/store/Profile";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { useAuthStore } from "@/store/Auth";

const route = useRoute();
const router = useRouter();
const profileStore = useProfileStore();
const profileApi = useProfileApi();

const isReady = ref(false);
const authStore = useAuthStore();
onMounted(async () => {
  const isEmpty = checkObjectEmpty(profileStore.profile);
  if (authStore.role == 4 && route.params.slug != authStore.user.slug) {
    router.push("/dashboard");
  }

  if (route.params.slug == " ") {
    router.replace({
      name: route.name,
      params: { slug: authStore.user.slug },
    });

    return;
  }
  const slug = route.params.slug;
  const profileSlug = !isEmpty ? profileStore.profile.slug : null;
  if (isEmpty || slug != profileSlug) {
    await profileApi.fetchProfile(slug).catch(() => {
      router.push({ name: "dashboard" });
    });
  }
  isReady.value = true;
});
</script>

<template>
  <!--begin::Navbar-->
  <div class="card mb-3">
    <div class="card-body pb-0">
      <!--begin::Details-->
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3 gap-4" v-if="isReady">
        <Photo />
        <User />
      </div>
      <div class="text-center align-items-center py-5" v-else>
        <CSpinner color="success" />
      </div>
      <Navigation />
    </div>
  </div>
  <!-- <CContainer> -->
  <router-view v-if="isReady"></router-view>
  <!-- </CContainer> -->
</template>
