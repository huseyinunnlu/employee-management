<script setup>
import { defineProps, ref } from "vue";
const props = defineProps(["steps", "isLoading"]);
const currentPage = ref(1);

const changePage = (page) => {
  currentPage.value = page;
};
</script>

<template>
  <div
    class="row d-flex col-sm-10 offset-md-1 flex-column justify-content-between"
    style="min-height: 400px"
  >
    <div class="my-5 d-flex justify-content-around page-nav">
      <div
        class="page nav-item d-flex align-items-center cursor-pointer"
        v-for="page in props.steps"
        :key="page.id"
        @click="changePage(page.id)"
      >
        <span
          class="d-flex justify-content-center align-items-center text-center fs-4 rounded-circle me-3"
          style="width: 50px; height: 50px"
          :class="
            currentPage == page.id
              ? 'bg-success text-light'
              : 'bg-muted text-dark'
          "
          >{{ page.id }}</span
        >
        <span class="text-muted fs-5">{{ $t(page.title) }}</span>
      </div>
    </div>
    <div class="page-main my-8">
      <div v-for="page in props.steps" :key="page">
        <div v-show="currentPage == page.id">
          <slot :name="`page-${page.id}`"></slot>
        </div>
      </div>
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <div class="d-flex justify-content-start flex-stack gap-2">
        <button
          type="button"
          @click="
            currentPage > 1 && currentPage <= props.steps.length
              ? currentPage--
              : ''
          "
          v-if="currentPage > 1"
          class="btn btn-light"
        >
          <i class="fas fa-arrow-left"></i>
          {{ $t("prev") }}
        </button>
        <button
          type="button"
          @click="
            currentPage >= 1 && currentPage < props.steps.length
              ? currentPage++
              : ''
          "
          class="btn btn-light"
          v-if="currentPage >= 1 && currentPage != props.steps.length"
        >
          {{ $t("next") }}
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
      <div class="buttons d-flex justify-content-end my-4">
        <Button
          :isLoading="isLoading"
          text="add"
          loadingText="adding"
          icon="fas fa-floppy-disk"
        />
      </div>
    </div>
  </div>
</template>
