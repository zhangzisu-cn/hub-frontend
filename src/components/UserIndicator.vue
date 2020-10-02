<template>
  <user-indicator-info v-if="state.loggedIn" />
  <v-btn outlined to="/login" color="primary" v-else>
    <v-icon left>mdi-account-circle</v-icon>
    Login
  </v-btn>
</template>

<script lang="ts">
import { api } from '@/api'
import { Component, Vue } from 'vue-property-decorator'
import UserIndicatorInfo from '@/components/UserIndicatorInfo.vue'

@Component({ components: { UserIndicatorInfo } })
export default class UserIndicator extends Vue {
  state = api.state
}
</script>
