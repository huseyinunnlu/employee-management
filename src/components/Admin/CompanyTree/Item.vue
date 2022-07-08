<script setup>
import { useTreeApi } from "@/store/ApiServices/TreeApi";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

import { defineProps, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const props = defineProps(["item"]);
const router = useRouter();
const treeApi = useTreeApi();
const visible = ref(true);

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

const { t } = useI18n();
const deleteItem = (id, model) => {
  swalWithBootstrapButtons
    .fire({
      title: t("Are you sure?"),
      text: t("You won't be able to revert this!"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("Yes, delete it!"),
      cancelButtonText: t("No, cancel!"),
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        treeApi
          .deleteCompany(id, model)
          .then(() => {
            swalWithBootstrapButtons.fire(t("Deleted!"), "success");
            window.location.reload();
          })
          .catch(() => {
            swalWithBootstrapButtons.fire(t("Cancelled"), t("error"));
          });
      }
    });
};

const goDetails = (e) => {
  if (e.target.localName != "i") {
    const dataType = props.item.data_type.toLowerCase();
    router.push({
      name: `${dataType}-info`,
      params: {
        id: props.item.id,
      },
    });
  }
};

const itemIcons = computed(() => {
  return {
    company: "fas fa-briefcase",
    department: "fas fa-sitemap",
    workplace: "fas fa-map-marker-alt",
  };
});
</script>
<template>
  <div class="accordion col-md-12 my-2" :id="`child_${props.item.toggle_id}`">
    <div class="accordion-item">
      <div
        @click="goDetails"
        class="d-flex align-items-center justify-content-between accordion-header"
        :id="`headingChildOne${props.item.toggle_id}`"
      >
        <div class="d-flex align-items-center">
          <span class="text-dark fw-bold">
            <i
              :class="itemIcons[props.item.data_type.toLowerCase()]"
              class="me-2 text-dark"
            ></i>
            {{ props.item.title || null }}</span
          >
        </div>

        <Button
          color="danger"
          icon="fas fa-trash"
          size="sm"
          @handleClick="deleteItem(props.item.id, props.item.data_type)"
        />
      </div>
      <div
        :id="`collapseChildOne${props.item.toggle_id}`"
        class="accordion-collapse collapse show"
        :aria-labelledby="`headingChildOne${props.item.toggle_id}`"
        :data-bs-parent="`#child${props.item.toggle_id}`"
      >
        <div
          class="accordion-body py-0"
          v-if="
            props.item.companies ||
            props.item.departments ||
            props.item.work_places
          "
          style="padding-right: 0px"
        >
          <Item
            v-for="item in props.item.companies ||
            props.item.departments ||
            props.item.work_places"
            :key="item.id"
            :item="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collapse-toggler {
  border: none !important;
  background: none;
  padding: 30px;
}

.accordion,
.accordion-item,
.accordion-body {
  border: none !important;
}

.accordion-header {
  transition: background-color 300ms;
  padding: 0 10px;
  &:hover {
    background-color: #f1f1f1;
  }
}
</style>
