import api from "./api";

class MusingsBoardService {

  // Retrieve all published Musings
  getAllPublished() {
      return api.get("/musingsboard");
  }

}

export default new MusingsBoardService();