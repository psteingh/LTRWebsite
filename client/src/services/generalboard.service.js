import api from "./api";

class GeneralBoardService {

  // Retrieve all published General Lies
  getAllPublished() {
      return api.get("/generalboard");
  }

}

export default new GeneralBoardService();