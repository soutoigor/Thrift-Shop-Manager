<template>
  <v-card
    class="resume-card"
    :loading="loading"
  >
    <template slot="progress">
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </template>
    <div v-if="!loading">
      <v-card-title class="resume-card__title">
        <slot name="title" />
      </v-card-title>
      <v-card-text class="resume-card__content">
        <slot name="content" />
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'ResumeCard',
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'

.resume-card
  background-color: var(--v-accent-base)
  @media #{map-get($display-breakpoints, 'xs-only')}
    width: 70vw !important

.resume-card__title
  display: flex
  justify-content: center
  font-size: 1.2rem
  font-weight: 700

.resume-card__content
  display: flex
  justify-content: center
  align-items: center
  font-size: 4rem
  font-weight: 700
  padding: 3rem 0 5rem 0
  @media #{map-get($display-breakpoints, 'xs-only')}
    padding: 2rem 0 3rem 0
    font-size: 2rem
</style>
