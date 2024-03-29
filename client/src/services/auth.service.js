import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login(email, password) {
    return api
      .post("/auth/signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
    localStorage.clear();
  }

  register(email, password) {
    return api.post("/auth/signup", {
      email,
      password
    });
  }

  getCurrentUser() {
    return TokenService.getUser();
  }

}

export default new AuthService();