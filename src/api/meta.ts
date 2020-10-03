import { BaseAPI } from './base'
import { MetaDTO } from './types'

export class MetaAPI extends BaseAPI {
  listByUser(userId: string): Promise<MetaDTO[]> {
    return this.hub.invoke('/meta/listbyuser', { userId })
  }

  update(id: string, value: string): Promise<void> {
    return this.hub.invoke('/meta/update', { id, value })
  }

  remove(id: string): Promise<void> {
    return this.hub.invoke('/meta/remove', { id })
  }
}
