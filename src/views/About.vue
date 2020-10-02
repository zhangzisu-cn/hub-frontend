<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="6" xl="4">
        <v-card>
          <v-card-title>
            <div class="text-center" style="width: 100%">
              <div>ZhangZisu.CN Hub</div>
              <div class="subtitle-2">MIT &copy; ZhangZisu</div>
            </div>
          </v-card-title>
          <v-divider />
          <v-list>
            <v-list-item v-for="(d, i) in info" :key="i">
              <v-list-item-icon>
                <v-icon :color="d.color">mdi-{{ d.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ d.key }}</v-list-item-title>
                <v-list-item-subtitle>{{ d.value }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import pkg from '@/../package.json'

const info = [
  { icon: 'update', color: '#000000', key: 'version', value: pkg.version },
  { icon: 'git', color: '#F05032', key: 'git', value: `${GIT_HASH.substr(0, 7)}@${GIT_BRANCH}` },
  { icon: 'server', color: '#FCA121', key: 'build', value: `${BUILD_DATE}` },
  { icon: 'vuejs', color: '#4FC08D', key: 'Vue', value: pkg.dependencies.vue },
  { icon: 'vuetify', color: '#1867C0', key: 'Vuetify', value: pkg.dependencies.vuetify }
]
@Component
export default class About extends Vue {
  info = info
}
</script>
