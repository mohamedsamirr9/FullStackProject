import { Iproductfake } from './iproductfake';

export interface Iproductresponse {
  products: Iproductfake[];
  total: number;
  skip: number;
  limit: number;
}
