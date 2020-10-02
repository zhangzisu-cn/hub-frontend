<template>
  <v-menu offset-y open-on-hover>
    <template v-slot:activator="{ on, attrs }">
      <v-btn outlined :loading="loading" v-bind="attrs" v-on="on">
        {{ nickname }}
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
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

  logout() {
    api.logout()
    this.$router.push('/login')
  }
}
</script>
