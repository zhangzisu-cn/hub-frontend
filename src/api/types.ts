export interface UserTokenDTO {
  id: string
  userId: string
  description: string
  created: number
}

export interface UserDTO {
  id: string
  username: string
  nickname: string
  email: string
  created: string
}

export interface MetaDTO {
  id: string
  value: string
  schema: SchemaDTO
}

export interface SchemaDTO {
  id: string
  name: string
  desc: string
  global: boolean
}
