<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="search"
        label="Buscar cliente"
        outlined
        clearable
        @input="handleFilter"
      />
    </v-col>
    <v-row v-if="hasClients">
      <v-col cols="12">
        <v-row v-if="$vuetify.breakpoint.xs">
          <v-col
            v-for="client of clients"
            :key="client.id"
            cols="12"
          >
            <item-client :client="client" />
          </v-col>
        </v-row>
        <v-data-table
          v-else
          :search="search"
          :headers="headers"
          :items="clients"
          hide-default-footer
        >
          <template v-slot:item="{ item }">
            <tr>
              <item-client :client="item" />
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        class="clients__empty"
        cols="12"
      >
        Não há clientes.
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
    ItemClient: () => import('@/components/client/ItemClient'),
  },
  props: {
    clients: {
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
    hasClients() {
      return this.clients.length > 0
    },
  },
  methods: {
    ...mapActions('client', ['setFilter']),
    handleFilter(filter) {
      if (this.$vuetify.breakpoint.xs) {
        this.setFilter(filter)
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.clients__empty
  font-size: 3rem
  text-align: center

</style>
