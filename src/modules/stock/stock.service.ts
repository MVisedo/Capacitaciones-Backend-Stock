import mongoose from "mongoose";
import { IStock, IStockDoc, StockOfProduct } from "./stock.interfaces";
import Stock from "./stock.model";
import { ApiError } from "../errors";
import httpStatus from "http-status";
import { publishToExchange } from "../rabbit/rabbit.publisher";

/**
 * Create a stock
 * @param {IStock} stockBody
 * @returns {Promise<IStockDoc>}
 */
export const createStock = async (stockBody: IStock): Promise<StockOfProduct> => {
  const id = new mongoose.Types.ObjectId(); 

  const stockWithId = {
    ...stockBody,
    _id: id,
  };

  
  await publishToExchange('stock.stock.created', stockWithId);

  
  return Stock.create(stockWithId);
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

    await publishToExchange('stock.stock.updated', {productId,updateBody});
    
    return stock;
  };

   /**
     * Delete stock by productId
     * @param {mongoose.Types.ObjectId} productId
     * @returns {Promise<IStockDoc | null>}
     */
    export const deleteStockByProductId = async (productId: mongoose.Types.ObjectId): Promise<IStockDoc | null> => {
      const stock = await getStockByProductId(productId);
      if (!stock) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Stock not found');
      }
      await stock.deleteOne();
      await publishToExchange('stock.stock.deleted',productId);
      return stock;
    };





  