<script setup>
import PageNavbar from "./PageNavbar.vue";
import Details from "./Details.vue";
import Edit from "./Edit.vue";
import ExpenseLine from "./ExpenseLines/List.vue";
import { computed, defineProps, onMounted, ref, watch } from "vue";
import { useExpenseStore } from "@/store/Admin/Expense";
import { useApiData } from "@/store/ApiServices/ApiData";
const props = defineProps(["selectedId", "show"]);
const isReady = ref(false);
const expenseStore = useExpenseStore();
const activeTab = ref("details");
const apiData = useApiData();

const selectedData = computed(() => {
  return expenseStore.getOneExpense(props.selectedId);
});

watch(selectedData, (value) => {
  if (value) {
    apiData.getExpenseTypes(value.user.company_id || null);
  }
});
</script>

<template>
  <CModal size="lg" :visible="show" @close="$emit('closeModal')">
    <CModalHeader>
      <CModalTitle>{{
        $t("detailsAttr", { attr: $t("expense") })
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
        <CTabPane
          role="tabpanel"
          aria-labelledby="expense-line-tab"
          :visible="activeTab === 'expenseLine'"
        >
          <ExpenseLine
            :item="selectedData.expense_lines"
            :companyId="selectedData.user.company_id"
            :expenseId="selectedData.id"
          />
        </CTabPane>
      </CTabContent>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="$emit('closeModal')"> Close </CButton>
    </CModalFooter>
  </CModal>
</template>
