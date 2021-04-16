<template>
  <v-form
    @submit.prevent="handleSubmit"
    class="form"
  >
    <v-row>
      <v-col cols="12">
        <v-menu
          v-model="dateMenu"
          close-on-content-click
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template #activator="{ on }">
            <v-text-field
              :value="dateFormatted"
              label="Data de venda"
              readonly
              outlined
              append-icon="mdi-calendar"
              v-on="on"
              :error="$v.form.date.$error"
            />
          </template>
          <v-date-picker
            v-model="form.date"
            no-title
            color="secondary"
          />
        </v-menu>
      </v-col>
      <v-col cols="12">
        <v-currency-field
          v-model="form.shipping_price"
          label="Preço de frete"
          clearable
          outlined
          :error="$v.form.shipping_price.$error"
          @change="$v.form.shipping_price.$touch()"
        />
      </v-col>
      <v-col cols="12">
        <v-autocomplete
          v-model="form.client_id"
          :items="clients"
          label="Cliente"
          item-text="name"
          item-value="id"
          :loading="isLoadingClients"
          outlined
          clearable
          :error="$v.form.client_id.$error"
          @change="$v.form.client_id.$touch()"
        />
      </v-col>
      <v-col
        v-if="!hasSale"
        cols="12"
      >
        <v-autocomplete
          v-model="form.items"
          :items="products"
          label="Produtos"
          item-text="name"
          item-value="id"
          multiple
          chips
          deletable-chips
          :loading="isLoadingProducts"
          outlined
          clearable
          :error="$v.form.items.$error"
          @change="$v.form.items.$touch()"
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          type="submit"
          color="primary"
          block
          large
          :loading="isLoadingSale"
        >
          {{ buttonTitle }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import dates from '@/mixins/dates'
import {
  required,
  requiredIf,
  minValue,
  decimal,
} from 'vuelidate/lib/validators'

export default {
  mixins: [dates],
  props: {
    sale: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data: () => ({
    form: {},
    dateMenu: false,
  }),
  validations() {
    return {
      form: {
        date: { required },
        shipping_price: { required, decimal, minValue: minValue(0) },
        client_id: { required },
        items: { required: requiredIf(() => !this.hasSale) },
      },
    }
  },
  mounted() {
    if (this.hasSale) {
      this.fillFormToEdit()
    } else {
      this.fillDefaultForm()
    }
  },
  computed: {
    ...mapGetters({
      clients: 'client/clients',
      products: 'product/products',
      isLoadingClients: 'client/isLoading',
      isLoadingProducts: 'product/isLoading',
      isLoadingSale: 'sale/isLoading',
    }),
    hasSale() {
      return !!this.sale.id
    },
    buttonTitle() {
      return this.hasSale ? 'Editar' : 'Cadastrar'
    },
    formTitle() {
      return this.hasSale ? 'Editar venda' : 'Cadastrar venda'
    },
    dateFormatted() {
      if (!this.form.date) return ''
      return this.formatISOToPTBR(this.form.date)
    },
  },
  created() {
    if (!this.hasSale) {
      this.listProducts()
    }
  },
  methods: {
    ...mapActions({
      updateSale: 'sale/updateSale',
      createSale: 'sale/createSale',
      listSales: 'sale/listSales',
      listProducts: 'product/listProducts',
      listSoldProducts: 'product/listSoldProducts',
    }),
    fillDefaultForm() {
      this.form = {
        shipping_price: null,
        client_id: null,
        items: [],
        date: this.dateNowISO(),
      }
    },
    fillFormToEdit() {
      this.form = {
        shipping_price: this.sale.shipping_price,
        client_id: this.sale.client_id,
        date: this.sale.date,
      }
    },
    async handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      if (this.hasSale) {
        await this.updateSale({
          id: this.sale.id,
          attributes: this.form,
        })
      } else {
        await this.createSale(this.form)
        this.listProducts()
        this.listSoldProducts()
      }
      this.listSales()
      this.$emit('saved')
    },
  },
}
</script>
