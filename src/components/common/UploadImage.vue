<template>
  <v-row class="upload">
    <v-col class="upload__image">
      <display-image
        :key="fileSrc"
        is-base
        :src="fileSrc || defaultPhoto"
      />
    </v-col>
    <v-col class="upload__actions">
      <v-btn
        v-if="fileSrc"
        icon
        dark
        color="error"
        class="actions__close"
        @click="setFileSrc(null)"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-file-input
        class="actions__upload"
        label="Escolha uma imagem"
        truncate-length="25"
        accept="image/*"
        capture
        prepend-icon="mdi-image-plus"
        hide-input
        :success="!!fileSrc"
        outlined
        :value="file"
        :loading="isLoading"
        @change="handleFileUpload($event)"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    defaultPhoto: {
      type: String,
      required: false,
      default: null,
    },
  },
  components: {
    DisplayImage: () => import('@/components/common/DisplayImage'),
  },
  data: () => ({
    file: null,
    fileSrc: null,
  }),
  computed: {
    ...mapGetters('upload', ['isLoading']),
  },
  methods: {
    ...mapActions('upload', [
      'createImage',
      'getImage',
    ]),
    setFileSrc(value) {
      this.fileSrc = value
    },
    emitImageName(name) {
      this.$emit('uploaded', name)
    },
    async handleFileUpload(uploadedFile) {
      if (!uploadedFile) return
      const attachment = new FormData()
      attachment.append('item_image', uploadedFile)
      const { fileName } = await this.createImage(attachment)
      const file = await this.getImage(fileName)
      this.emitImageName(fileName)
      this.setFileSrc(file)
    },
  },
}
</script>

<style lang="sass" scoped>
.upload
  display: flex

.upload__actions
  flex: 0
  display: flex
  flex-direction: column
  align-items: flex-end
  justify-content: flex-end

.actions__upload
  flex: 0

.actions__close
  margin-right: 3px

.upload__image
  flex: 1
  border-radius: 6px !important
  max-width: 90%
</style>
