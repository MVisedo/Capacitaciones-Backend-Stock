import mongoose from "mongoose";
import { IUProduct } from "./product.interfaces";
import { toJSON } from "../toJSON";


const productSchema = new mongoose.Schema<IUProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      required: true,
    },
    user: {
      type: String,
    },
    precio: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true,
  }
);
productSchema.plugin(toJSON);

const Product = mongoose.model<IUProduct>('User', productSchema);

export default Product;