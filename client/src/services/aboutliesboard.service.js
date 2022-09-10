import api from "./api";

class AboutLiesBoardService {

  // Retrieve all published About Lies
  getAllPublished() {
      return api.get("/aboutliesboard");
  }

}

export default new AboutLiesBoardService();