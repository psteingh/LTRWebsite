import api from "./api";

class MediaBoardService {

  // Retrieve all published Media Lies
  getAllPublished() {
      return api.get("/mediaboard");
  }

}

export default new MediaBoardService();