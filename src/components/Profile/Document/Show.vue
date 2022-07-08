<script setup>
import PageNavbar from "./PageNavbar.vue";
import Details from "./Details.vue";
import Edit from "./Edit.vue";
import { useProfileStore } from "@/store/Profile";
import { ref, defineProps, computed } from "vue";

const emit = defineEmits(["closeModal"]);
const profileStore = useProfileStore();
const props = defineProps(["selectedId", "show"]);
const activeTab = ref("details");
const selectedData = computed(() => {
  const data = profileStore.documents.find((item) => {
    return item.id == props.selectedId;
  });
  if (!data) {
    emit("closeModal");
  }
  return data;
});
</script>
<template>
  <CModal size="lg" :visible="show" @close="$emit('closeModal')">
    <CModalHeader>
      <CModalTitle>{{ $t("detailsAttr", { attr: $t("debit") }) }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <PageNavbar
        :activeTab="activeTab"
        @changePage="
          (page) => {
            activeTab = page;
          }
        "
      />
      <CTabContent>
        <CTabPane
          role="tabpanel"
          aria-labelledby="details-tab"
          :visible="activeTab === 'details'"
        >
          <Details :item="selectedData" />
        </CTabPane>
        <CTabPane
          role="tabpanel"
          aria-labelledby="edit-tab"
          :visible="activeTab === 'edit'"
        >
          <Edit :item="selectedData" />
        </CTabPane>
      </CTabContent>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="$emit('closeModal')"> Close </CButton>
    </CModalFooter>
  </CModal>
</template>
