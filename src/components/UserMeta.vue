<template>
  <v-card flat>
    <v-card-text>
      WIP - Meta
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator'

@Component
export default class UserMeta extends Vue {
  @PropSync('loading')
  _loading!: boolean
}
</script>
