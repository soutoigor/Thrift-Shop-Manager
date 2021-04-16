<template>
  <fragment>
    <v-card v-if="$vuetify.breakpoint.smAndDown">
      <v-card-title>
        {{ product.name | trimStringBy(25) }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-if="product.photo"
            cols="12"
          >
            <display-image
              :src="product.photo"
              is-base
              class="product__image"
            />
          </v-col>
          <v-col
            cols="12"
            class="product__info"
          >
            <span class="info__label">Comprado em:</span>
            {{ product.newItem.date | formatDate }}
          </v-col>
          <v-col
            cols="6"
            class="product__info"
          >
            <span class="info__label">Preço de compra:</span>
            {{ product.newItem.buy_price | currencyBRL }}
          </v-col>
          <v-col
            cols="6"
            class="product__info"
          >
            <span class="info__label">Preço para venda:</span>
            {{ product.price | currencyBRL }}
          </v-col>
          <v-col
            cols="6"
            class="product__info"
          >
            <span class="info__label">Categoria:</span>
            {{ product.category.name }}
          </v-col>
          <v-col
            cols="6"
            class="product__info"
          >
            <span class="info__label">Fornecedor:</span>
            {{ product.newItem.provider.name | trimStringBy(17) }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
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
    </v-card>
    <fragment v-else>
      <td>
        <display-image
          :src="product.photo"
          is-base
          class="product__image"
        />
      </td>
      <td>{{ product.name }}</td>
      <td>{{ product.newItem.date | formatDate }}</td>
      <td>{{ product.newItem.buy_price | currencyBRL }}</td>
      <td>{{ product.price | currencyBRL }}</td>
      <td>{{ product.category.name }}</td>
      <td>{{ product.newItem.provider.name }}</td>
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
    <full-screen-modal
      :open="isEditDialogOpen"
      @close="closeEditDialog"
    >
      <template #title>
        Editar produto
      </template>
      <template #content>
        <register-product
          :product="product"
          @saved="handleEditProduct"
        />
      </template>
    </full-screen-modal>
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
  components: {
    Fragment,
    FullScreenModal: () => import('@/components/common/FullScreenModal'),
    PopupModal: () => import('@/components/common/PopupModal'),
    RegisterProduct: () => import('@/components/product/RegisterProduct'),
    DisplayImage: () => import('@/components/common/DisplayImage'),
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isEditDialogOpen: false,
    isDeleteDialogOpen: false,
  }),
  computed: {
    ...mapGetters('product', ['isLoading']),
  },
  methods: {
    ...mapActions('product', [
      'listProducts',
      'deleteProduct',
    ]),
    async handleDelete() {
      await this.deleteProduct(this.product.id)
      await this.listProducts()
      this.closeDeleteDialog()
    },
    handleEditProduct() {
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
  },
}
</script>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'

.product__title
  font-size: 1.3rem
  font-weight: 400

.product__image
  margin: .5rem 0
  width: 100px
  @media #{map-get($display-breakpoints, 'sm-and-down')}
    width: 175px

.product__info
  display: flex
  flex-direction: column

.info__label
  font-weight: 700

</style>
