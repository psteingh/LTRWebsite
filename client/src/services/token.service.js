class TokenService {
    // api.js - response.use
    getLocalRefreshToken() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.refreshToken;
    }
  
    // api.js - request.use
    getLocalAccessToken() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.accessToken;
    }
  
    // api.js - after response.use
    updateLocalAccessToken(token) {
      let user = JSON.parse(localStorage.getItem("user"));
      user.accessToken = token;
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    // Register
    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    }
  
    // Login
    setUser(user) {
      console.log("token.service.setUser", JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
    }

    


    // Logout    
    removeUser() {
      localStorage.removeItem("user");
    }
  }
  
  export default new TokenService();