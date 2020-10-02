import Vue from 'vue'
import { UserAPI } from './user'

const kAccessToken = 'access-token'
const kUserId = 'user-id'

export class APIHub {
  state = new Vue({
    data: {
      loggedIn: false
    }
  })

  user: UserAPI

  constructor() {
    this.state.loggedIn = !!this.token
    this.user = new UserAPI(this)
  }

  private get token() {
    return localStorage.getItem(kAccessToken)
  }

  private set token(val) {
    val ? localStorage.setItem(kAccessToken, val) : localStorage.removeItem(kAccessToken)
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
    const [userId, tokenId, token] = await this.invoke('/misc/login', { username, pass, description: 'Hub' })
    this.token = token
    this.userId = userId
    this.state.loggedIn = true
  }
}