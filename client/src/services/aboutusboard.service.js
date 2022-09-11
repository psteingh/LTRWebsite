import api from "./api";

class AboutUsBoardService {

  // Retrieve all published AboutUs
  getAllPublished() {
      return api.get("/aboutusboard");
  }

}

export default new AboutUsBoardService();