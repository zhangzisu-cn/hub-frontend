<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="6" xl="4">
        <v-card :loading="loading">
          <v-tabs v-model="tab">
            <v-tabs-slider></v-tabs-slider>
            <v-tab key="basic">
              Basic
            </v-tab>
            <v-tab-item key="basic">
              <user-basic :loading.sync="loading" />
            </v-tab-item>
            <v-tab key="passwd">
              Password
            </v-tab>
            <v-tab-item key="passwd">
              <user-password />
            </v-tab-item>
            <v-tab key="token">
              Tokens
            </v-tab>
            <v-tab-item key="token">
              <user-token />
            </v-tab-item>
            <v-tab key="meta">
              Meta
            </v-tab>
            <v-tab-item key="meta">
              <user-meta />
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { api } from '@/api'
import { Component, Vue } from 'vue-property-decorator'
import UserBasic from '@/components/UserBasic.vue'
import UserPassword from '@/components/UserPassword.vue'
import UserToken from '@/components/UserToken.vue'
import UserMeta from '@/components/UserMeta.vue'

@Component({ components: { UserBasic, UserPassword, UserToken, UserMeta } })
export default class Home extends Vue {
  tab = 0
  loading = false
  username = ''
  nickname = ''
  email = ''
  password = ''

  beforeCreate() {
    if (!api.state.loggedIn) {
      this.$router.push('/login')
    }
  }

  async created() {
    this.loading = true
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = await api.user.getOneOrFail(api.userId!)
    this.username = user.username
    this.nickname = user.nickname
    this.email = user.email
    this.password = user.password
    this.loading = false
  }
}
</script>
