import { IUProduct } from "./product.interfaces";
import Product from "./product.model";




/**
 * Create a user
 * @param {IUProduct} productBody
 * @returns {Promise<IUProduct>}
 */
export const createProduct = async (productBody: IUProduct): Promise<IUProduct> => {
    return Product.create(productBody);
  };