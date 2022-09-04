import api from "./api";

class BibleBoardService {

  // Retrieve all published Bible Lies
  getAllPublished() {
      return api.get("/bibleboard");
  }

}

export default new BibleBoardService();