import api from "./api";

const categoryService = {
  getAll: () => {
    return api.get(`/Category`);
  },
};

export default categoryService;
