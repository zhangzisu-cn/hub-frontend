import { BaseAPI } from './base'
import { MetaDTO } from './types'

export class MetaAPI extends BaseAPI {
  listByUser(userId: string): Promise<MetaDTO[]> {
    return this.hub.invoke('/meta/listbyuser', { userId })
  }

  listByApp(appId: string): Promise<MetaDTO[]> {
    return this.hub.invoke('/meta/listbyapp', { appId })
  }

  listGlobal(): Promise<MetaDTO[]> {
    return this.hub.invoke('/meta/listglobal', {})
  }

  update(id: string, value: string): Promise<void> {
    return this.hub.invoke('/meta/update', { id, value })
  }

  remove(id: string): Promise<void> {
    return this.hub.invoke('/meta/remove', { id })
  }

  create(name: string, value: string, userId?: string, appId?: string): Promise<string> {
    return this.hub.invoke('/meta/create', { name, value, userId, appId })
  }
}
