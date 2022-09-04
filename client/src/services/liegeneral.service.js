import api from "./api";

class LieGeneralDataService {

  // Create a new LieGeneral - 1st
  create(data) {
    return api.post("/liesgeneral", data);
  }

  // Retrieve all LieGenerals
  getAll() {
    return api.get("/liesgeneral");
  }
  
  // Update a LieGeneral with id
  update(id, data) {
    return api.put(`/liesgeneral/${id}`, data);
  }

  // Retrieve a LieGeneral with id
  get(id) {
    return api.get(`/liesgeneral/${id}`);
  }
  
  // Delete a LieGeneral with id
  delete(id) {
    return api.delete(`/liesgeneral/${id}`);
  }

  // Search LieGenerals by Title
  findTitle(title) {
    return api.get(`/liesgeneral?title=${title}`);
  }
  
}

export default new LieGeneralDataService();