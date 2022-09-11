import api from "./api";

class AboutUsDataService {

  // Create a new AboutUs - 1st
  create(data) {
    return api.post("/aboutus", data);
  }

  // Retrieve all AboutUs
  getAll() {
    return api.get("/aboutus");
  }
  
  // Update an AboutUs with id
  update(id, data) {
    return api.put(`/aboutus/${id}`, data);
  }

  // Retrieve an AboutUs with id
  get(id) {
    return api.get(`/aboutus/${id}`);
  }
  
  // Delete an AboutUs with id
  delete(id) {
    return api.delete(`/aboutus/${id}`);
  }

  // Search AboutUs by Title
  findTitle(title) {
    return api.get(`/aboutus?title=${title}`);
  }
  
}

export default new AboutUsDataService();