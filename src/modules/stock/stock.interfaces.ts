import mongoose, { Document, Model } from "mongoose";

export interface IStock{
    productId:mongoose.Schema.Types.ObjectId,
    cantidad:number
}

export interface IStockDoc extends IStock,Document{}

export interface IStockModel extends Model<IStockDoc> {}

export interface StockOfProduct{
    cantidad:number
}


