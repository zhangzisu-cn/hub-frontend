<template>
  <v-card flat>
    <v-data-table dense :headers="headers" :items="tokens" item-key="id">
      <template v-slot:[`item.id`]="{ item }">
        <code>{{ item.id }}</code>
      </template>
      <template v-slot:[`item.created`]="{ item }">
        {{ new Date(item.created).toLocaleString() }}
      </template>
      <template v-slot:[`item._actions`]="{ item }">
        <v-icon small @click="remove(item.id)" :disabled="_loading">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { api } from '@/api'
import { UserTokenDTO } from '@/api/types'
import { Component, PropSync, Vue } from 'vue-property-decorator'

@Component
export default class UserToken extends Vue {
  @PropSync('loading')
  _loading!: boolean

  headers = [
    { text: 'ID', align: 'start', value: 'id' },
    { text: 'Description', value: 'desc' },
    { text: 'Created', value: 'created' },
    { text: 'Actions', value: '_actions', sortable: false }
  ]
  tokens: UserTokenDTO[] = []

  created() {
    this.load()
  }

  async load() {
    this._loading = true
    this.tokens = await api.user.listTokens(api.userId!)
    this._loading = false
  }

  async remove(id: string) {
    this._loading = true
    await api.user.removeToken(id)
    await this.load()
    this._loading = false
  }
}
</script>
