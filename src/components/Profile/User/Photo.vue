<script setup>
// import UpdatePhoto from "./UpdatePhoto.vue";
import { useProfileStore } from "@/store/Profile";
import { computed } from "vue";

const profileStore = useProfileStore();

const photo = computed(() => {
  return profileStore.profile.card.photo || null;
});
</script>
<template>
  <div class="me-7 mb-4">
    <div class="symbol position-relative cursor-pointer">
      <img :src="photo" alt="image" />
      <div class="upload-icon">
        <i class="fas fa-upload"></i>
      </div>
    </div>
  </div>
  <!-- <UpdatePhoto /> -->
</template>
<style lang="scss" scoped>
.upload-icon {
  display: none;
  position: absolute;
  text-align: center;
  align-items: center;
  align-self: center;
  top: 0;
  background: #777;
  z-index: 10;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  opacity: 0.5;

  i {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 2.5rem;
    color: #fff;
  }
}
.symbol {
  cursor: pointer;
  img {
    max-width: 160px;
    max-height: 160px;
    border-radius: 10px;
  }
  &:hover .upload-icon {
    display: block;
  }
}
</style>
