<script setup>
import PageNavbar from "./PageNavbar.vue";
import Details from "./Details.vue";
import Edit from "./Edit.vue";

import { useProfileStore } from "@/store/Profile";
import { defineProps, computed, ref } from "vue";
const profileStore = useProfileStore();
const props = defineProps(["selectedId", "show"]);
const activeTab = ref("details");
const selectedData = computed(() => {
  const data = profileStore.profile.education_info.find((item) => {
    return item.id == props.selectedId;
  });
  return data;
});
</script>
<template>
  <CModal size="lg" :visible="show" @close="$emit('closeModal')">
    <CModalHeader>
      <CModalTitle>{{
        $t("addAttr", { attr: $t("educationInfo") })
      }}</CModalTitle>
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
