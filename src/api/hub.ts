import Vue from 'vue'
import { MetaAPI } from './meta'
import { UserAPI } from './user'

const kAccessToken = 'access-token'
const kTokenId = 'token-id'
const kUserId = 'user-id'

export class APIHub {
  state = new Vue({
    data: {
      loggedIn: false
    }
  })

  user: UserAPI
  meta: MetaAPI

  private _restateTimeout?: number

  constructor() {
    this.reloadState()
    this.user = new UserAPI(this)
    this.meta = new MetaAPI(this)
    window.addEventListener('storage', () => {
      this.lazyReloadState()
    })
  }

  private lazyReloadState() {
    if (this._restateTimeout) {
      clearTimeout(this._restateTimeout)
    }
    this._restateTimeout = setTimeout(() => {
      this.reloadState()
      this._restateTimeout = undefined
    }, 200)
  }

  private reloadState() {
    this.state.loggedIn = !!this.token
  }

  get token() {
    return localStorage.getItem(kAccessToken)
  }

  set token(val) {
    val ? localStorage.setItem(kAccessToken, val) : localStorage.removeItem(kAccessToken)
  }

  get tokenId() {
    return localStorage.getItem(kTokenId)
  }

  set tokenId(val) {
    val ? localStorage.setItem(kTokenId, val) : localStorage.removeItem(kTokenId)
  }

  get userId() {
    return localStorage.getItem(kUserId)
  }

  set userId(val) {
    val ? localStorage.setItem(kUserId, val) : localStorage.removeItem(kUserId)
  }

  async invoke(url: string, body: any) {
    url = '/api' + url
    const headers: any = {
      'Content-Type': 'application/json'
    }
    if (this.token) {
      headers['x-access-token'] = this.token
    }
    const res = await fetch(url, { method: 'post', body: JSON.stringify(body), headers })
    const data = await res.json()
    if (data.ok) {
      return data.result
    } else {
      throw new Error(data.result)
    }
  }

  async login(username: string, pass: string) {
    const [userId, tokenId, token] = await this.invoke('/misc/login', { username, pass, desc: 'Hub' })
    this.token = token
    this.userId = userId
    this.tokenId = tokenId
    this.state.loggedIn = true
  }

  async logout() {
    await this.user.removeToken(this.tokenId!).catch(e => console.log(e))
    this.token = ''
    this.userId = ''
    this.tokenId = ''
    this.state.loggedIn = false
  }
}
