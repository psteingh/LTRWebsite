import api from "./api";

class LieMediaDataService {

  // Create a new LieMedia - 1st
  create(data) {
    return api.post("/liesmedia", data);
  }

  // Retrieve all LieMedias
  getAll() {
    return api.get("/liesmedia");
  }
  
  // Update a LieMedia with id
  update(id, data) {
    return api.put(`/liesmedia/${id}`, data);
  }

  // Retrieve a LieMedia with id
  get(id) {
    return api.get(`/liesmedia/${id}`);
  }
  
  // Delete a LieMedia with id
  delete(id) {
    return api.delete(`/liesmedia/${id}`);
  }

  // Search LieMedias by Title
  findTitle(title) {
    return api.get(`/liesmedia?title=${title}`);
  }
  
}

export default new LieMediaDataService();