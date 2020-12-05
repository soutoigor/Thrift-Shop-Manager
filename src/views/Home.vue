<template>
  <div class="home">
    Hello World {{ userName }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {},
  computed: {
    ...mapGetters('auth', ['userName']),
  },
}
</script>
