import Joi from "joi";
import { IStock } from "./stock.interfaces";
import { objectId } from "../validate";


const createStockBody: Record<keyof IStock, any> = {
  productId: Joi.string().required().custom(objectId),
  cantidad: Joi.number().required().min(0),
};

export const createStock = {
  body: Joi.object().keys(createStockBody),
};


export const getStock = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

export const updateStock = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      cantidad: Joi.number().min(0)
    })
    .min(1),
};


export const deleteStock = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};
