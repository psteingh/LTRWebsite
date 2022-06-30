import api from "./api";

class LierBoardService {

  // Retrieve all published LtrLies
  getAllPublished() {
      return api.get("/lierboard");
  }

  // Sort all published LtrLies
  sortAllPublished() {
    return api.get("/lierboard");
  }

}

export default new LierBoardService();