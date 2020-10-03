<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="10" xl="6">
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
              <user-password :loading.sync="loading" />
            </v-tab-item>
            <v-tab key="token">
              Tokens
            </v-tab>
            <v-tab-item key="token">
              <user-token :loading.sync="loading" />
            </v-tab-item>
            <v-tab key="meta">
              Meta
            </v-tab>
            <v-tab-item key="meta">
              <user-meta :loading.sync="loading" />
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
import { NavigationGuardNext, Route } from 'vue-router'

@Component({
  components: { UserBasic, UserPassword, UserToken, UserMeta },
  beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
    if (!api.state.loggedIn) {
      next('/login')
    } else {
      next()
    }
  }
})
export default class Home extends Vue {
  tab = 0
  loading = false
}
</script>
