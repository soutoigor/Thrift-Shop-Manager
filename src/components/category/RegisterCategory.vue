<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field
          v-model="name"
          label="Nome da categoria"
          outlined
          clearable
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          type="submit"
          color="primary"
          block
          large
          :loading="isLoading"
          :disabled="hasNotName"
        >
          {{ buttonTitle }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    category: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data: () => ({
    name: null,
  }),
  mounted() {
    if (this.hasCategory) {
      this.prepareToEdit()
    }
  },
  computed: {
    ...mapGetters('category', ['isLoading']),
    hasNotName() {
      return !this.name
    },
    hasCategory() {
      return !!this.category.id
    },
    buttonTitle() {
      return this.hasCategory ? 'Editar' : 'Criar'
    },
  },
  methods: {
    ...mapActions('category', [
      'createCategory',
      'updateCategory',
      'listCategory',
    ]),
    prepareToEdit() {
      this.setName(this.category.name)
    },
    setName(name) {
      this.name = name
    },
    async handleSubmit() {
      const category = { name: this.name }
      if (this.hasCategory) {
        await this.updateCategory({
          id: this.category.id,
          attributes: category,
        })
      } else {
        await this.createCategory(category)
      }
      this.listCategory()
      this.$emit('saved')
      this.setName(null)
    },
  },
}
</script>
