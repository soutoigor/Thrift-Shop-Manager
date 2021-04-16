<template>
  <v-row
    class="category"
    no-gutters
  >
    <v-col
      cols="12"
      sm="8"
    >
      <h1 class="category__title">Categorias</h1>
    </v-col>
    <v-col
      cols="12"
      sm="4"
    >
      <v-btn
        color="primary"
        large
        block
        @click="openDialog"
      >
        Criar categoria
      </v-btn>
    </v-col>
    <v-col
      cols="12"
      class="category__list"
    >
      <list-categories />
    </v-col>
    <popup-modal
      :open="isDialogOpen"
      @close="closeDialog"
      width="30vw"
    >
      <template #title>
        Criar categoria
      </template>
      <template #content>
        <register-category @saved="handleCategoryCreation" />
      </template>
    </popup-modal>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
    PopupModal: () => import('@/components/common/PopupModal'),
    RegisterCategory: () => import('@/components/category/RegisterCategory'),
    ListCategories: () => import('@/components/category/ListCategories'),
  },
  data: () => ({
    isDialogOpen: false,
  }),
  created() {
    this.listCategory()
  },
  methods: {
    ...mapActions('category', [
      'listCategory',
    ]),
    handleCategoryCreation() {
      this.closeDialog()
    },
    openDialog() {
      this.isDialogOpen = true
    },
    closeDialog() {
      this.isDialogOpen = false
    },
  },
}
</script>

<style lang="sass" scoped>
.category
  display: flex
  align-items: center

.category__title
  font-size: 4rem
  font-weight: 300

.category__list
  margin-top: 3rem

</style>
