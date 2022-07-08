<script setup>
import { useTreeApi } from "@/store/ApiServices/TreeApi";
import { useTreeStore } from "@/store/Admin/Company/Tree";
import { ref, defineProps, onMounted } from "vue";
import { useRoute } from "vue-router";
import AddItem from "./AddItem.vue";

const permittedUsers = ref([]);
const isLoading = ref(false);
const isReady = ref(false);
const addModal = ref(false);
const treeStore = useTreeStore();
const treeApi = useTreeApi();

const route = useRoute();
const props = defineProps(["title", "column"]);
onMounted(async () => {
  await treeApi.getUsersForManagerAdding(route.params.id, "company_id");
  isReady.value = true;
});
const changePerms = (id) => {
  const index = permittedUsers.value.indexOf(id);
  index > -1
    ? permittedUsers.value.splice(index, 1)
    : permittedUsers.value.push(id);
};

const storePerms = () => {
  const form = {
    id: route.params.id,
    column: props.column,
    form: permittedUsers.value,
  };
  isLoading.value = true;
  treeApi
    .storeUserPerms(form)
    .then(() => {
      permittedUsers.value = [];
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <Button
    color="success"
    @handleClick="addModal = true"
    text="add"
    icon="fas fa-plus"
  />

  <CModal size="lg" :visible="addModal" @close="addModal = false">
    <CModalHeader>
      <CModalTitle>{{ $t("addAttr", { attr: $t(props.title) }) }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="row" v-if="isReady">
        <table
          class="table table-hover table-rounded table-striped border gy-7 gs-7"
        >
          <thead>
            <tr>
              <th>{{ $t("fullName") }}</th>
              <th>{{ $t("role") }}</th>
              <th>{{ $t("actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <AddItem
              v-for="item in treeStore.addUsers"
              :key="item.id"
              :item="item"
              @addUser="changePerms"
            />
          </tbody>
        </table>
      </div>
      <div class="text-center align-items-center py-5" v-else>
        <CSpinner color="success" />
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="addModal = false"> Close </CButton>
      <Button
        :disabled="permittedUsers.length < 1"
        @click="storePerms()"
        :isLoading="isLoading"
        text="add"
        loadingText="adding"
        icon="fas fa-floppy-disk"
      />
    </CModalFooter>
  </CModal>
</template>
