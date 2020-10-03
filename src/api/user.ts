import { BaseAPI } from './base'
import { UserDTO, UserTokenDTO } from './types'

export class UserAPI extends BaseAPI {
  getOneOrFail(id: string): Promise<UserDTO> {
    return this.hub.invoke('/user/getoneorfail', { id })
  }

  update(id: string, username?: string, nickname?: string, email?: string, passwd?: string): Promise<void> {
    return this.hub.invoke('/user/update', { id, username, nickname, email, passwd })
  }

  listTokens(userId: string): Promise<UserTokenDTO[]> {
    return this.hub.invoke('/user/listtokens', { userId })
  }

  removeToken(id: string): Promise<void> {
    return this.hub.invoke('/user/removetoken', { id })
  }
}
