<template>
  <v-snackbar
    :value="show"
    :timeout="-1"
    :color="status"
    top
  >
    <span>{{ message }}</span>
    <template #action="{ attrs }">
      <v-btn
        icon
        dark
        v-bind="attrs"
        @click="closeError"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
const SNACKBAR_TIMEOUT = 5000

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeError() {
      this.$emit('closeError')
    },
  },
  watch: {
    show(value) {
      if (value) {
        setTimeout(this.closeError, SNACKBAR_TIMEOUT)
      }
    },
  },
}
</script>
