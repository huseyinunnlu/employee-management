<script setup>
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

import { useMusteriApi } from "@/store/ApiServices/MusteriApi";

import { defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const props = defineProps(["item"]);
const router = useRouter();
const { t } = useI18n();
const musteriApi = useMusteriApi();

const goDetails = (e) => {
  if (e.target.localName != "i" && e.target.localName != "button") {
    router.push({
      name: "company-info",
      params: {
        id: props.item.id,
      },
    });
  }
};

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success text-light",
    cancelButton: "btn btn-danger text-light",
  },
  buttonsStyling: false,
});

const deleteItem = (musteriId, id) => {
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
        musteriApi
          .deleteCompany(musteriId, id)
          .then(() => {
            Swal.fire(t("Deleted!"), t("success"));
          })
          .catch(() => {
            Swal.fire(t("Cancelled"), t("error"));
          });
      }
    });
};

const fire = () => {
  swalWithBootstrapButtons.fire({
    title: "Error!",
    text: "Do you want to continue",
    icon: "error",
    confirmButtonText: "Cool",
  });
};
</script>
<template>
  <tr @click="goDetails">
    <td>{{ props.item.title }}</td>
    <td>{{ props.item.city }}</td>
    <td>
      <Button
        color="danger"
        icon="fas fa-trash"
        size="sm"
        @handleClick="deleteItem(props.item.musteri_id, props.item.id)"
      />
    </td>
  </tr>
</template>
