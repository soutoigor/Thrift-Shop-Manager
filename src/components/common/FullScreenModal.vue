<template>
  <v-dialog
    v-model="open"
    fullscreen
    transition="dialog-bottom-transition"
    @click:outside="closeModal"
    @keydown.esc="closeModal"
  >
    <v-card>
      <v-toolbar
        dark
        color="secondary"
      >
      <v-card-title>
        <v-toolbar-title>
          <slot name="title" />
        </v-toolbar-title>
      </v-card-title>
      <v-spacer />
      <v-btn
        fab
        icon
        @click="closeModal"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
      <v-card-text>
        <slot name="content" />
      </v-card-text>
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
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>
