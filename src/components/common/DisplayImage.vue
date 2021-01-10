<template>
<div class="image-display">
  <v-img
    lazy-src="@/assets/default-product-image.jpg"
    :src="fileSrc"
    alt="Imagem do produto"
    contain
    :aspect-ratio="4/3"
  >
    <template #placeholder>
      <v-row
        v-if="fileSrc"
        class="fill-height ma-0"
        align="center"
        justify="center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </v-row>
    </template>
  </v-img>
</div>
</template>

<script>
export default {
  props: {
    src: {
      type: [String, Object],
      required: false,
      default: null,
    },
    isBase: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    fileSrc() {
      if (!this.src) return null
      return this.isBase ? `data:image/jpeg;base64, ${this.src}` : this.src
    },
  },
}
</script>

<style lang="sass" scoped>
.image-display
  background-color: #efefef
  border-radius: 6px
</style>
