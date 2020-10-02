<template>
  <v-card flat>
    <v-card-text>
      WIP - Token
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator'

@Component
export default class UserToken extends Vue {
  @PropSync('loading')
  _loading!: boolean
}
</script>
