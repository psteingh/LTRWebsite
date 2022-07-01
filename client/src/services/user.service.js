import api from './api';

class UserService {
  getPublicContent() {
    return api.get('/test/all');
  }

  getUser() {
    return api.get('/test/user');
  }

  getAdmin() {
    return api.get('/test/admin');
  }

}

export default new UserService();