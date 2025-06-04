import Joi from "joi";
import { IProduct } from "./product.interfaces";
import { objectId } from "../validate";

const createProductBody: Record<keyof IProduct, any> = {
  name: Joi.string().required(),
  descripcion: Joi.string().required(),
  imagen: Joi.string().required(),
  user: Joi.string().required().custom(objectId),
  precio: Joi.number().required(),
};

export const createProduct = {
  body: Joi.object().keys(createProductBody),
};

export const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    precio: Joi.number(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

export const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      descripcion: Joi.string(),
      precio: Joi.number(),
      name: Joi.string(),
      imagen: Joi.string()
    })
    .min(1),
};

export const updateProductStock = {
  params: Joi.object().keys({
      productId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        cantidad: Joi.number()
      }),
};

export const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};
