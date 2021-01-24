<template>
  <v-row class="home">
    <v-col cols="12">
      <h1 class="home__title">
        Bem-vinda(o), <span class="home__user-name">{{ userName | firstTwoNames }}</span>
      </h1>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <h2 class="home__subtitle">Alguns dados do seu brechó:</h2>
        </v-col>
        <resume-list />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import ResumeList from '@/components/home/ResumeList'

export default {
  name: 'Home',
  components: {
    ResumeList,
  },
  computed: {
    ...mapGetters('auth', ['userName']),
  },
}
</script>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'

.home
  display: flex
  align-items: center

.home__user-name
  font-weight: 700
  text-transform: capitalize

.home__title
  font-size: 4rem
  font-weight: 300
  @media #{map-get($display-breakpoints, 'sm-and-down')}
    font-size: 2rem
    display: flex
    flex-direction: column

.home__subtitle
  font-weight: 500

</style>
