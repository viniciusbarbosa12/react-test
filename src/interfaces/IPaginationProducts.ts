import { IProduct } from "./Product";

export interface IPaginationProduct {
  itens: IProduct[];
  totalItens: number;
  totalPage: number;
}
