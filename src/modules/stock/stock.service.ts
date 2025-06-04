import mongoose from "mongoose";
import { IStock, IStockDoc, StockOfProduct } from "./stock.interfaces";
import Stock from "./stock.model";
import { ApiError } from "../errors";
import httpStatus from "http-status";

/**
 * Create a stock
 * @param {IStock} stockBody
 * @returns {Promise<IStockDoc>}
 */
export const createStock = async (stockBody: IStock): Promise<StockOfProduct> => {
    return Stock.create(stockBody);
  };

  /**
   * Get stock by productId
   * @param {mongoose.Types.ObjectId} productId
   * @returns {Promise<StockOfProduct | null>}
   */
  export const getStockByProductId = async (productId: mongoose.Types.ObjectId): Promise<IStockDoc | null> => Stock.findOne({ productId });
  
/**
 * Update stock by productId
 * @param {mongoose.Types.ObjectId} productId
 * @param {StockOfProduct} updateBody
 * @returns {Promise<StockOfProduct | null>}
 */
  export const updateStockByProductId = async (
    productId: mongoose.Types.ObjectId,
    updateBody: StockOfProduct
  ): Promise<IStockDoc | null> => {
    const stock = await getStockByProductId(productId);
    if (!stock) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Stock not found');
    }
    Object.assign(stock, updateBody);
    await stock.save();
    return stock;
  };