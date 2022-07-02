import api from './api';

class UserService {
  getPublicContent() {
    return api.get('/test/all');
  }

  getUser() {
    return api.get('/test/user');
  }

}

export default new UserService();