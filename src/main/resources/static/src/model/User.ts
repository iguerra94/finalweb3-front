import Role from './Role'

interface User {
  id?: number
  username?: string
  name?: string
  lastName?: string
  roles?: Role[]
}

export default User
