<template>
  <v-card
    class="sold-product"
    flat
    tile
  >
    <v-card-title>
      {{ product.name }}
    </v-card-title>
    <v-card-text class="sold-product__content">
      <v-row no-gutters>
        <v-col
          class="sold-product__item"
          cols="12"
          md="2"
        >
          <display-image
            v-if="shouldDisplayImage"
            :src="product.photo"
            is-base
            class="sold-product__image"
          />
        </v-col>
        <v-col
          class="sold-product__item"
          cols="6"
          md="2"
        >
          <span class="sold-product__item-label">Preço:</span>
          <span>
            {{ product.price | currencyBRL }}
          </span>
        </v-col>
        <v-col
          class="sold-product__item"
          cols="6"
          md="2"
        >
          <span class="sold-product__item-label">Preço de compra:</span>
          <span>
            {{ product.newItem.buy_price | currencyBRL }}
          </span>
        </v-col>
        <v-col
          class="sold-product__item"
          cols="6"
          md="2"
        >
          <span class="sold-product__item-label">Categoria:</span>
          <span>
            {{ product.category.name }}
          </span>
        </v-col>
        <v-col
          class="sold-product__item"
          cols="6"
          md="2"
        >
          <span class="sold-product__item-label">Fornecedor:</span>
          <span>
            {{ product.newItem.provider.name }}
          </span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'SoldProduct',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  components: {
    DisplayImage: () => import('@/components/common/DisplayImage'),
  },
  computed: {
    shouldDisplayImage() {
      if (this.$vuetify.breakpoint.smAndUp) return true
      return this.product.photo
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'

.sold-product
  background-color: var(--v-accent-base)
  width: 100%
  &:not(:first-child)
    border-top: 1px solid var(--v-accent-lighten4)

.sold-product__content
  display: flex

.sold-product__image
  margin: .5rem 0
  width: 100px
  @media #{map-get($display-breakpoints, 'sm-and-down')}
    width: 175px

.sold-product__item-label
  font-weight: 700
  font-size: 1.1rem

.sold-product__item
  display: flex
  flex-direction: column
  justify-content: center

</style>
