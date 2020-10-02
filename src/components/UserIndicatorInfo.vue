<template>
  <v-btn outlined :loading="loading">
    {{ nickname }}
  </v-btn>
</template>

<script lang="ts">
import { api, evUserChanged } from '@/api'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class UserIndicatorInfo extends Vue {
  loading = false
  nickname = ''

  created() {
    this.load()
    api.state.$on(evUserChanged, this.load)
    this.$on('hook:beforeDestroy', () => api.state.$off(evUserChanged, this.load))
  }

  async load() {
    this.loading = true
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = await api.user.getOneOrFail(api.userId!)
    this.nickname = user.nickname
    this.loading = false
  }
}
</script>
