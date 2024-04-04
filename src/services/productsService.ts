import { IPagination } from "../interfaces/IPagination";
import { IProduct } from "../interfaces/Product";
import api from "./api";

const productService = {
  getAll: (IPagination: IPagination) => {
    return api.post(`/Product/getAllPaginated`, IPagination);
  },
  getById: (id: string) => {
    return api.get(`/Product/${id}`);
  },
  create: (values: IProduct) => {
    return api.post(`/Product`, values);
  },
  update: (values: IProduct) => {
    return api.put(`/Product`, values);
  },
};

export default productService;
