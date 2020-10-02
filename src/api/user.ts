import { BaseAPI } from './base'

export class UserAPI extends BaseAPI {
  getOneOrFail(id: string) {
    return this.hub.invoke('/user/getoneorfail', { id })
  }

  async update(id: string, username?: string, nickname?: string, email?: string, passwd?: string) {
    return this.hub.invoke('/user/update', { id, username, nickname, email, passwd })
  }
}
