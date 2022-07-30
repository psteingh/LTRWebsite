import api from './api';

class UserService {
  // Public/all
  getPublicContent() {
    return api.get('/test/all');
  }

  // Private/user
  getUser() {
    return api.get('/test/user');
  }

}

export default new UserService();