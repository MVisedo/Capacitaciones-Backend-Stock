import { Document, Model } from "mongoose";
import { QueryResult } from "../paginate/paginate";

export interface IProduct {
    name:string,
    descripcion:string,
    imagen:string,
    user:string,
    precio:number
}

export interface IProductDoc extends IProduct,Document{}

export interface IProductModel extends Model<IProductDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}


export type UpdateProductBody = Partial<IProduct>;