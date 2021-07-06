import api from 'src/api/api'

class UserService {
  public async getUserInfo(): Promise<any> {
    return api.user.getUserInfo()
  }
}

export default new UserService()
