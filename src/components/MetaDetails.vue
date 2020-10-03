<template>
  <v-card flat tile :loading="loading">
    <v-tabs>
      <v-tab key="desc">Description</v-tab>
      <v-tab-item key="desc">
        <v-card-title>
          <div>
            <div>{{ meta.schema.name }}</div>
            <div class="text-overline">{{ meta.schema.id }}</div>
          </div>
          <v-spacer />
          <v-icon v-if="meta.schema.global">mdi-earth</v-icon>
          <v-icon v-else>mdi-account</v-icon>
          <v-icon v-if="internal">mdi-lock-outline</v-icon>
        </v-card-title>
        <v-card-text>
          {{ meta.schema.desc }}
        </v-card-text>
      </v-tab-item>
      <v-tab key="edit">Edit</v-tab>
      <v-tab-item key="edit">
        <v-card-text>
          <v-textarea label="Value" v-model="value" :disabled="internal" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="remove" :disabled="loading || internal">Delete</v-btn>
          <v-spacer />
          <v-btn color="warning" @click="reset" :disabled="loading || internal">Reset</v-btn>
          <v-btn color="primary" @click="update" :disabled="loading || internal">Update</v-btn>
        </v-card-actions>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import { api } from '@/api'
import { MetaDTO } from '@/api/types'
import { Component, Prop, Vue } from 'vue-property-decorator'

const systemList = ['IS_ADMIN']

@Component
export default class MetaDetails extends Vue {
  @Prop({ required: true })
  meta!: MetaDTO

  value = ''
  loading = false

  created() {
    this.reset()
  }

  reset() {
    this.value = this.meta.value
  }

  get internal() {
    return systemList.includes(this.meta.schema.name)
  }

  async update() {
    this.loading = true
    await api.meta.update(this.meta.id, this.value)
    this.$emit('updated')
    this.loading = false
  }

  async remove() {
    this.loading = true
    await api.meta.remove(this.meta.id)
    this.$emit('updated')
    this.loading = false
  }
}
</script>
