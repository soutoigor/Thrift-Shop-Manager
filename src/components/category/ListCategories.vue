<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        label="Buscar categoria"
        outlined
        clearable
        @input="setFilter"
      />
    </v-col>
    <v-col
      v-if="isLoading"
      class="categories__loading"
      cols="12"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="40"
      />
    </v-col>
    <v-col
      v-else
      cols="12"
      class="categories"
    >
      <v-row v-if="hasCategories">
        <v-col
          cols="12"
          md="3"
          v-for="category of categories"
          :key="category.id"
        >
          <item-category :category="category" />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          cols="12"
          class="categories__empty"
        >
          Não há categorias.
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemCategory from '@/components/category/ItemCategory'

export default {
  components: {
    ItemCategory,
  },
  data: () => ({
    name: null,
  }),
  computed: {
    ...mapGetters('category', [
      'categories',
      'isLoading',
    ]),
    hasCategories() {
      return this.categories.length > 0
    },
  },
  methods: {
    ...mapActions('category', ['setFilter']),
  },
}
</script>

<style lang="sass" scoped>
.categories
  display: flex
  flex-wrap: wrap

.categories__loading
  display: flex
  justify-content: center

.categories__empty
  font-size: 3rem
  text-align: center

</style>
