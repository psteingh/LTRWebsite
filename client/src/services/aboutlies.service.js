import api from "./api";

class AboutLiesDataService {

  // Create a new AboutLies - 1st
  create(data) {
    return api.post("/aboutlies", data);
  }

  // Retrieve all AboutLies
  getAll() {
    return api.get("/aboutlies");
  }
  
  // Update an AboutLies with id
  update(id, data) {
    return api.put(`/aboutlies/${id}`, data);
  }

  // Retrieve an AboutLies with id
  get(id) {
    return api.get(`/aboutlies/${id}`);
  }
  
  // Delete an AboutLies with id
  delete(id) {
    return api.delete(`/aboutlies/${id}`);
  }

  // Search AboutLies by Title
  findTitle(title) {
    return api.get(`/aboutlies?title=${title}`);
  }
  
}

export default new AboutLiesDataService();