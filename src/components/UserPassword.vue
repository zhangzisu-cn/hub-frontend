<template>
  <v-card flat>
    <v-card-text>
      <v-text-field label="New password" v-model="password" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="update" :disabled="_loading">Update</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { api } from '@/api'
import { Component, PropSync, Vue } from 'vue-property-decorator'

@Component
export default class UserPassword extends Vue {
  @PropSync('loading')
  _loading!: boolean

  password = ''

  async update() {
    this._loading = true
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await api.user.update(api.userId!, undefined, undefined, undefined, this.password)
    this._loading = false
  }
}
</script>
