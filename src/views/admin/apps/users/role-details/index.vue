<template>
  <BRow>
    <BCol cols="12">
      <div class="d-flex align-items-sm-center flex-sm-row flex-column my-3">
        <div class="flex-grow-1">
          <h4 class="fs-xl mb-1">Role Details</h4>
          <p class="text-muted mb-0">Define and manage roles to streamline operations and ensure secure access control.</p>
        </div>

        <div class="text-end mt-3 mt-sm-0">
          <BButton variant="success"> <Icon icon="plus" class="me-1" /> Add New Role </BButton>
        </div>
      </div>

      <BRow>
        <BCol md="4" lg="3">
          <RoleDetailCard />
        </BCol>

        <BCol md="8" lg="9">
          <UserTable />
        </BCol>
      </BRow>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import Icon from '~/components/wrappers/Icon.vue'
import RoleDetailCard from './components/RoleDetailCard.vue'
import UserTable from './components/UserTable.vue'

</script>
<style scoped></style>
