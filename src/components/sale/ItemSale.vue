<template>
  <fragment>
    <v-card v-if="$vuetify.breakpoint.smAndDown">
      <v-card-text>
        <v-row>
          <v-col
            v-if="sale.photo"
            cols="12"
          >
            <display-image
              :src="sale.photo"
              is-base
              class="sale__image"
            />
          </v-col>
          <v-col
            cols="6"
            class="sale__info"
          >
            <span class="info__label">Preço total:</span>
            {{ sale.total_price | currencyBRL }}
          </v-col>
          <v-col
            cols="6"
            class="sale__info"
          >
            <span class="info__label">Vendido em:</span>
            {{ sale.date | formatDate }}
          </v-col>
          <v-col
            cols="6"
            class="sale__info"
          >
            <span class="info__label">Frete:</span>
            {{ sale.shipping_price | currencyBRL }}
          </v-col>
          <v-col
            cols="6"
            class="sale__info"
          >
            <span class="info__label">Cliente:</span>
            {{ sale.client.name | trimStringBy(18) }}
          </v-col>
          <v-col
            cols="6"
            class="sale__info"
          >
            <span class="info__label">Contato:</span>
            {{ sale.client.contact }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="primary"
          :disabled="isExpanded"
          @click="openExpandProducts"
        >
          ver produtos
        </v-btn>
        <v-spacer />
        <v-btn
          icon
          fab
          small
          dark
          color="secondary"
        @click="openEditDialog"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          fab
          small
          dark
          color="error"
          @click="openDeleteDialog"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <v-card
          v-if="isExpanded"
          class="transition-fast-in-fast-out v-card--reveal"
        >
          <v-card-title>Produtos vendidos</v-card-title>
          <v-card-text>
            <sold-product
              v-for="{ id, item } of sale.itemSell"
              :key="id"
              :product="item"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="primary"
              @click="closeExpandProducts"
            >
              fechar produtos
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
    <fragment v-else>
      <td>{{ sale.date | formatDate }}</td>
      <td>{{ sale.shipping_price | currencyBRL }}</td>
      <td>{{ sale.client.name | trimStringBy(20) }}</td>
      <td>{{ sale.client.contact }}</td>
      <td>{{ sale.total_price | currencyBRL }}</td>
      <td>
        <v-btn
          icon
          fab
          small
          dark
          color="secondary"
        @click="openEditDialog"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          fab
          small
          dark
          color="error"
          @click="openDeleteDialog"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </td>
    </fragment>
    <popup-modal
      :open="isEditDialogOpen"
      @close="closeEditDialog"
      width="50vw"
    >
      <template #title>
        Editar venda
      </template>
      <template #content>
        <register-sale
          v-if="isEditDialogOpen"
          :sale="sale"
          @saved="handleEditSale"
        />
      </template>
    </popup-modal>
    <popup-modal
      :open="isDeleteDialogOpen"
      width="30vw"
      @close="closeDeleteDialog"
    >
      <template #title>
        Certeza que deseja excluir?
      </template>
      <template #actions>
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="6"
          >
            <v-btn
              color="primary"
              block
              @click="closeDeleteDialog"
            >
              Cancelar
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-btn
              text
              color="primary"
              block
              :loading="isLoading"
              @click="handleDelete"
            >
              Excluir
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </popup-modal>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ItemSale',
  components: {
    Fragment,
    PopupModal: () => import('@/components/common/PopupModal'),
    RegisterSale: () => import('@/components/sale/RegisterSale'),
    DisplayImage: () => import('@/components/common/DisplayImage'),
    SoldProduct: () => import('@/components/sale/SoldProduct'),
  },
  props: {
    sale: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isEditDialogOpen: false,
    isDeleteDialogOpen: false,
    isExpanded: false,
  }),
  computed: {
    ...mapGetters('sale', ['isLoading']),
  },
  methods: {
    ...mapActions('sale', [
      'listSales',
      'deleteSale',
    ]),
    async handleDelete() {
      await this.deleteSale(this.sale.id)
      await this.listSales()
      this.closeDeleteDialog()
    },
    handleEditSale() {
      this.closeEditDialog()
    },
    openDeleteDialog() {
      this.isDeleteDialogOpen = true
    },
    openEditDialog() {
      this.isEditDialogOpen = true
    },
    closeDeleteDialog() {
      this.isDeleteDialogOpen = false
    },
    closeEditDialog() {
      this.isEditDialogOpen = false
    },
    openExpandProducts() {
      this.isExpanded = true
    },
    closeExpandProducts() {
      this.isExpanded = false
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'

.sale__title
  font-size: 1.3rem
  font-weight: 400

.sale__image
  margin: .5rem 0
  width: 100px
  @media #{map-get($display-breakpoints, 'sm-and-down')}
    width: 175px

.sale__info
  display: flex
  flex-direction: column

.info__label
  font-weight: 700

</style>
