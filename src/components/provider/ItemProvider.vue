<template>
  <fragment>
    <v-card v-if="$vuetify.breakpoint.xs">
      <v-card-title>
        {{ provider.name | trimStringBy(25) }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            class="provider__info"
            cols="12"
          >
            <span class="info__label">Contato:</span>
            <span>{{ provider.contact }}</span>
          </v-col>
          <v-col
            class="provider__info"
            cols="12"
          >
            <span class="info__label">Telefone:</span>
            <span>{{ provider.telephone }}</span>
          </v-col>
          <v-col
            class="provider__info"
            cols="12"
          >
            <span class="info__label">Endereço:</span>
            <span>{{ provider.address }}</span>
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
        @click="openEditProvider"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          fab
          small
          dark
          color="error"
          @click="openDeleteProvider"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <fragment v-else>
      <td>{{ provider.name }}</td>
      <td>{{ provider.telephone }}</td>
      <td>{{ provider.contact }}</td>
      <td>{{ provider.address }}</td>
      <td>
        <v-btn
          icon
          fab
          small
          dark
          color="secondary"
        @click="openEditProvider"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          fab
          small
          dark
          color="error"
          @click="openDeleteProvider"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </td>
    </fragment>
    <popup-modal
      :open="isDialogOpen"
      width="30vw"
      @close="closeDialog"
    >
      <template #title>
        {{ dialogTitle }}
      </template>
      <template #content>
        <register-provider
          v-if="isEditing"
          :provider="provider"
          @created="handleEditProvider"
        />
      </template>
      <template #actions>
        <v-row
          v-if="!isEditing"
          no-gutters
        >
          <v-col
            cols="12"
            sm="6"
          >
            <v-btn
              color="primary"
              block
              @click="closeDialog"
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
  props: {
    provider: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isDialogOpen: false,
    isEditing: false,
  }),
  components: {
    Fragment,
    PopupModal: () => import('@/components/common/PopupModal'),
    RegisterProvider: () => import('@/components/provider/RegisterProvider'),
  },
  computed: {
    ...mapGetters('provider', ['isLoading']),
    dialogTitle() {
      return this.isEditing ? 'Editar fornecedor' : 'Certeza que deseja excluir?'
    },
  },
  methods: {
    ...mapActions('provider', [
      'listProvider',
      'deleteProvider',
    ]),
    async handleDelete() {
      await this.deleteProvider(this.provider.id)
      await this.listProvider()
      this.closeDialog()
    },
    async handleEditProvider() {
      await this.listProvider()
      this.closeDialog()
    },
    openEditProvider() {
      this.setIsEditing(true)
      this.openDialog()
    },
    openDeleteProvider() {
      this.setIsEditing(false)
      this.openDialog()
    },
    setIsEditing(value) {
      this.isEditing = value
    },
    openDialog() {
      this.isDialogOpen = true
    },
    closeDialog() {
      this.isDialogOpen = false
    },
  },
}
</script>

<style lang="sass" scoped>
.provider
  display: flex
  flex-direction: column

.provider__info
  display: flex
  flex-direction: column

.info__label
  font-weight: 700
</style>
