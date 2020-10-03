<template>
  <v-card flat>
    <v-data-table dense :headers="headers" :items="metas" item-key="id" show-expand>
      <template v-slot:[`item.id`]="{ item }">
        <code>{{ item.id }}</code>
      </template>
      <template v-slot:[`item.schema.name`]="{ item }">
        <code>{{ item.schema.name }}</code>
      </template>
      <template v-slot:[`item.value`]="{ item }">
        <code>{{ item.value }}</code>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="expanded-content">
          <meta-details :meta="item" @updated="load" />
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { api } from '@/api'
import { MetaDTO } from '@/api/types'
import { Component, PropSync, Vue } from 'vue-property-decorator'
import MetaDetails from '@/components/MetaDetails.vue'

@Component({ components: { MetaDetails } })
export default class UserMeta extends Vue {
  @PropSync('loading')
  _loading!: boolean

  headers = [
    { text: 'ID', align: 'start', value: 'id' },
    { text: 'Key', value: 'schema.name' },
    { text: 'Value', value: 'value' }
  ]
  metas: MetaDTO[] = []

  created() {
    this.load()
  }

  async load() {
    this._loading = true
    this.metas = await api.meta.listByUser(api.userId!)
    this._loading = false
  }
}
</script>

<style lang="scss" scoped>
.expanded-content {
  padding: 0 !important;
  box-shadow: none !important;
}
</style>
