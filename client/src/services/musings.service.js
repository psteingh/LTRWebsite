import api from "./api";

class MusingsDataService {

  // Create a new Musings - 1st
  create(data) {
    return api.post("/musings", data);
  }

  // Retrieve all Musings
  getAll() {
    return api.get("/musings");
  }
  
  // Update a Musings with id
  update(id, data) {
    return api.put(`/musings/${id}`, data);
  }

  // Retrieve a Musings with id
  get(id) {
    return api.get(`/musings/${id}`);
  }
  
  // Delete a Musings with id
  delete(id) {
    return api.delete(`/musings/${id}`);
  }

  // Search Musings by Title
  findTitle(title) {
    return api.get(`/musings?title=${title}`);
  }
  
}

export default new MusingsDataService();