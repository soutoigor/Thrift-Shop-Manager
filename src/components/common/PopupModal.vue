<template>
  <v-dialog
    v-model="open"
    :width="modalWidth"
    @click:outside="closeModal"
    @keydown.esc="closeModal"
  >
    <v-card>
      <v-card-title class="card__title">
          <slot name="title" />
        <v-spacer />
        <v-btn
          fab
          icon
          @click="closeModal"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <slot name="content" />
      </v-card-text>
      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    width: {
      type: String,
      required: false,
      default: '1000',
    },
  },
  computed: {
    modalWidth() {
      return this.$vuetify.breakpoint.xs ? '100vw' : this.width
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'

.card
  padding-left: 1rem
  padding-right: 1rem
  @media #{map-get($display-breakpoints, 'xs-only')}
    padding-left: 0
    padding-right: 0

.card__title
  font-size: 1.5rem !important
  @media #{map-get($display-breakpoints, 'xs-only')}
    font-size: 1.2rem !important
</style>
