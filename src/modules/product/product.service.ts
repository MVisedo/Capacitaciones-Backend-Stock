import mongoose from "mongoose";
import { IProduct, IProductDoc } from "./product.interfaces";
import Product from "./product.model";
import { UpdateUserBody } from "../user/user.interfaces";
import { ApiError } from "../errors";
import httpStatus from "http-status";
import { IOptions, QueryResult } from "../paginate/paginate";





/**
 * Create a product
 * @param {IProduct} productBody
 * @returns {Promise<IProductDoc>}
 */
export const createProduct = async (productBody: IProduct): Promise<IProductDoc> => {
    return Product.create(productBody);
  };

/**
 * Get product by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IProductDoc | null>}
 */
export const getProductById = async (id: mongoose.Types.ObjectId): Promise<IProductDoc | null> => Product.findById(id);


  /**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryProducts = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const products = await Product.paginate(filter, options);
  return products;
};

  /**
   * Update product by id
   * @param {mongoose.Types.ObjectId} productId
   * @param {UpdateProductBody} updateBody
   * @returns {Promise<IProductDoc | null>}
   */
  export const updateProductById = async (
    productId: mongoose.Types.ObjectId,
    updateBody: UpdateUserBody
  ): Promise<IProductDoc | null> => {
    const product = await getProductById(productId);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    Object.assign(product, updateBody);
    await product.save();
    return product;
  };

  /**
   * Delete product by id
   * @param {mongoose.Types.ObjectId} productId
   * @returns {Promise<IProductDoc | null>}
   */
  export const deleteProductById = async (productId: mongoose.Types.ObjectId): Promise<IProductDoc | null> => {
    const product = await getProductById(productId);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    await product.deleteOne();
    return product;
  };