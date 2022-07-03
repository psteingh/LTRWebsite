import api from "./api";

class BibleBoardService {

  // Retrieve all published LtrLies
  getAllPublished() {
      return api.get("/bibleboard");
  }

}

export default new BibleBoardService();