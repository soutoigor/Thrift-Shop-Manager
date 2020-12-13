<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="search"
        label="Buscar fornecedor"
        outlined
        clearable
        @input="handleFilter"
      />
    </v-col>
    <v-row v-if="hasProviders">
      <v-col cols="12">
        <v-row v-if="$vuetify.breakpoint.xs">
          <v-col
            v-for="provider of providers"
            :key="provider.id"
            cols="12"
          >
            <item-provider :provider="provider" />
          </v-col>
        </v-row>
        <v-data-table
          v-else
          :search="search"
          :headers="headers"
          :items="providers"
          hide-default-footer
        >
          <template v-slot:item="{ item }">
            <tr>
              <item-provider :provider="item" />
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        class="providers__empty"
        cols="12"
      >
        Não há fornecedores.
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
    ItemProvider: () => import('@/components/provider/ItemProvider'),
  },
  props: {
    providers: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data: () => ({
    search: null,
    name: null,
    headers: [
      {
        text: 'Nome',
        value: 'name',
      },
      {
        text: 'Telefone',
        value: 'telephone',
        sortable: false,
      },
      {
        text: 'Contato',
        value: 'contact',
        sortable: false,
      },
      {
        text: 'Endereço',
        value: 'address',
        sortable: false,
      },
      {
        text: 'Ações',
        value: '',
      },
    ],
  }),
  computed: {
    hasProviders() {
      return this.providers.length > 0
    },
  },
  methods: {
    ...mapActions('provider', ['setFilter']),
    handleFilter(filter) {
      if (this.$vuetify.breakpoint.xs) {
        this.setFilter(filter)
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.providers__empty
  font-size: 3rem
  text-align: center

</style>
