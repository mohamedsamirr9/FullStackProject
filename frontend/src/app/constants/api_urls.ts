import { environment } from '../../environments/environment.development';

const domain = environment.Domain;
const domain2 = environment.Domain2;

export const API_URLS = {
  getProducts: `${domain}products`,
  getProduct: `${domain}products`,
  addProduct: `${domain}products/add`,
  deleteProduct: `${domain}products`,
  searchProducts: `${domain}products/search`,
  login: `${domain}auth/login`,
};

export const API_URLS2 = {
  getProducts: `${domain2}Product`,
  getProduct: `${domain2}Product`,
  searchProductsByName: `${domain2}Product`,
  getCategories: `${domain2}Category`,
  getProductsByCategory: `${domain2}Product/category`,
  login: `${domain2}Auth/login`,
  register: `${domain2}Auth/register`,
  getCartItems: `${domain2}Cart`,
  addToCart: `${domain2}Cart`,
  updateCartItem: `${domain2}Cart`,
  deleteCartItem: `${domain2}Cart`,
};
