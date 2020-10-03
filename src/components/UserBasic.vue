<template>
  <v-card flat>
    <v-card-text>
      <v-text-field label="Username" v-model="username" disabled />
      <v-text-field label="Nickname" v-model="nickname" />
      <v-text-field label="Email" type="email" v-model="email" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="error" @click="reset" :disabled="_loading">Reset</v-btn>
      <v-btn color="primary" @click="update" :disabled="_loading">Update</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { api, evUserChanged } from '@/api'
import { Component, PropSync, Vue } from 'vue-property-decorator'

@Component
export default class UserBasic extends Vue {
  @PropSync('loading')
  _loading!: boolean

  username = ''
  nickname = ''
  email = ''

  created() {
    this.reset()
  }

  async update() {
    this._loading = true
    await api.user.update(api.userId!, this.username, this.nickname, this.email)
    api.state.$emit(evUserChanged)
    this._loading = false
  }

  async reset() {
    this._loading = true
    const user = await api.user.getOneOrFail(api.userId!)
    this.username = user.username
    this.nickname = user.nickname
    this.email = user.email
    this._loading = false
  }
}
</script>
