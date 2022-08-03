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

        if (response.data.accessToken) {
          TokenService.setAuthenticate(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
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

  getCurrentAuthenticate() {
    return TokenService.getAuthenticate();
  }

}

export default new AuthService();