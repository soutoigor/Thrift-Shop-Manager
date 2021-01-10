<template>
<v-container>
  <v-row>
    <v-col cols="12">
      <h1 class="form-title">{{ formTitle }}</h1>
    </v-col>
  </v-row>
  <v-form
    @submit.prevent="handleSubmit"
    class="form"
  >
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <upload-image
          :default-photo="form.photo"
          @uploaded="setPhotoName"
        />
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.name"
              label="Descrição"
              clearable
              outlined
              :error="$v.form.name.$error"
              @change="$v.form.name.$touch()"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
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
                  label="Data de compra"
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
          <v-col
            cols="12"
            md="6"
          >
            <v-currency-field
              v-model="form.buy_price"
              label="Preço de compra"
              clearable
              outlined
              :error="$v.form.buy_price.$error"
              @change="$v.form.buy_price.$touch()"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-currency-field
              v-model="form.price"
              label="Preço para venda"
              clearable
              outlined
              :error="$v.form.price.$error"
              @change="$v.form.price.$touch()"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-autocomplete
              v-model="form.category_id"
              :items="categories"
              label="Categoria"
              item-text="name"
              item-value="id"
              :loading="isLoadingCategories"
              outlined
              clearable
              :error="$v.form.category_id.$error"
              @change="$v.form.category_id.$touch()"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-autocomplete
              v-model="form.provider_id"
              :items="providers"
              label="Fornecedor"
              item-text="name"
              item-value="id"
              :loading="isLoadingProviders"
              outlined
              clearable
              :error="$v.form.provider_id.$error"
              @change="$v.form.provider_id.$touch()"
            />
          </v-col>
          <v-col cols="12">
            <v-btn
              type="submit"
              color="primary"
              block
              large
              :loading="isLoadingProduct"
            >
              {{ buttonTitle }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import dates from '@/mixins/dates'
import {
  required,
  minLength,
  minValue,
  decimal,
} from 'vuelidate/lib/validators'

export default {
  components: {
    UploadImage: () => import('@/components/common/UploadImage'),
  },
  mixins: [dates],
  props: {
    product: {
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
        name: { required, minLength: minLength(2) },
        buy_price: { required, decimal, minValue: minValue(0) },
        price: { required, decimal, minValue: minValue(0) },
        category_id: { required },
        provider_id: { required },
        date: { required },
      },
    }
  },
  mounted() {
    if (this.hasProduct) {
      this.fillFormToEdit()
    } else {
      this.fillDefaultForm()
    }
  },
  computed: {
    ...mapGetters({
      categories: 'category/categories',
      providers: 'provider/providers',
      isLoadingCategories: 'category/isLoading',
      isLoadingProviders: 'provider/isLoading',
      isLoadingProduct: 'product/isLoading',
    }),
    hasProduct() {
      return !!this.product.id
    },
    buttonTitle() {
      return this.hasProduct ? 'Editar' : 'Criar'
    },
    formTitle() {
      return this.form.name || 'Novo produto'
    },
    dateFormatted() {
      if (!this.form.date) return ''
      return this.formatISOToPTBR(this.form.date)
    },
  },
  methods: {
    ...mapActions({
      updateProduct: 'product/updateProduct',
      createProduct: 'product/createProduct',
    }),
    fillDefaultForm() {
      this.form = {
        name: null,
        photo_name: null,
        photo: null,
        buy_price: 0,
        price: 0,
        category_id: null,
        provider_id: null,
        date: this.dateNowISO(),
      }
    },
    setPhotoName(name) {
      this.form.photo_name = name
    },
    fillFormToEdit() {
      this.form = {
        name: this.product.name,
        photo_name: this.product.photo_name,
        photo: this.product.photo,
        buy_price: this.product.newItem.buy_price,
        price: this.product.price,
        category_id: this.product.category_id,
        provider_id: this.product.newItem.provider_id,
        date: this.product.newItem.date,
      }
    },
    async handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      if (this.hasProduct) {
        await this.updateProduct({
          id: this.product.id,
          attributes: this.form,
        })
      } else {
        await this.createProduct(this.form)
      }
      this.$emit('created')
    },
  },
}
</script>

<style lang="sass" scoped>
.form-title
  margin-top: 2rem
  font-size: 3rem
  font-weight: 400
  line-height: 3rem

.form
  margin-top: 3rem
</style>
