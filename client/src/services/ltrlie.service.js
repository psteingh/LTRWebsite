import api from "./api";

class LtrLieDataService {

  // Create a new LtrLie - 1st
  create(data) {
    return api.post("/ltrlies", data);
  }

  // Retrieve all LtrLies
  getAll() {
    return api.get("/ltrlies");
  }
  
  // Update a LtrLie with id
  update(id, data) {
    return api.put(`/ltrlies/${id}`, data);
  }

  // Retrieve a LtrLie with id
  get(id) {
    return api.get(`/ltrlies/${id}`);
  }
  
  // Delete a LtrLie with id
  delete(id) {
    return api.delete(`/ltrlies/${id}`);
  }

  // Search LtrLies by Name
  findName(name) {
    return api.get(`/ltrlies?name=${name}`);
  }
  
}

export default new LtrLieDataService();