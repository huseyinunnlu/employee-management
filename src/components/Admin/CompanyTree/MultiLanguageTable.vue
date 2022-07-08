<script setup>
import { defineProps, defineEmits, reactive, ref } from "vue";
const props = defineProps(["data", "isEditing", "parentName"]);
defineEmits(["deleteItem", "updateTitle"]);
const selectedId = ref(null);
const form = reactive({
  title: null,
});
</script>
<template>
  <div class="row my-10">
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="(i, index) in props.data"
        :key="index"
      >
        <Input
          v-if="i.id && selectedId == i.id && props.isEditing"
          v-model="form.title"
          :label="$t('title')"
          name="title"
          rules="required|max:255"
          :showLabel="false"
          :inline="false"
        />
        <span v-else>{{ i.title }}</span>
        <span>{{ i.lang_code }}</span>
        <div
          class="d-flex"
          v-if="i.id && selectedId == i.id && props.isEditing"
        >
          <Button
            size="sm"
            color="info"
            icon="fas fa-check"
            @handleClick="
              $emit('updateTitle', i.id, i[props.parentName], form),
                (selectedId = null)
            "
          />
          <Button
            size="sm"
            color="danger"
            icon="fas fa-times"
            @handleClick="selectedId = null"
          />
        </div>
        <div class="d-flex" v-else>
          <Button
            v-if="props.isEditing"
            size="sm"
            color="info"
            icon="fas fa-pen"
            @handleClick="(selectedId = i.id), (form.title = i.title)"
          />
          <Button
            size="sm"
            color="danger"
            icon="fas fa-trash"
            @handleClick="$emit('deleteItem', index, i.id)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
