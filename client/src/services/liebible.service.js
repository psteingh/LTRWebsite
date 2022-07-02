import api from "./api";

class LieBibleDataService {

  // Create a new LieBible - 1st
  create(data) {
    return api.post("/liesbible", data);
  }

  // Retrieve all LieBibles
  getAll() {
    return api.get("/liesbible");
  }
  
  // Update a LieBible with id
  update(id, data) {
    return api.put(`/liesbible/${id}`, data);
  }

  // Retrieve a LieBible with id
  get(id) {
    return api.get(`/liesbible/${id}`);
  }
  
  // Delete a LieBible with id
  delete(id) {
    return api.delete(`/liesbible/${id}`);
  }

  // Search LieBibles by Title
  findTitle(title) {
    return api.get(`/liesbible?title=${title}`);
  }
  
}

export default new LieBibleDataService();