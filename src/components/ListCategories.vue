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
    <v-row
      v-if="hasCategories"
      class="categories"
    >
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
        class="categories__empty"
        cols="12"
      >
        Não há categorias.
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import ItemCategory from '@/components/ItemCategory'

export default {
  components: {
    ItemCategory,
  },
  props: {
    categories: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data: () => ({
    name: null,
  }),
  computed: {
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

.categories__empty
  font-size: 3rem
  text-align: center

</style>
