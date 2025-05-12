import httpStatus from "http-status";
import { catchAsync } from "../utils";
import mongoose from "mongoose";
import { ApiError } from "../errors";
import { productService } from ".";
import { Request, Response } from "express";



export const createProduct = catchAsync(async (req: Request, res: Response) => {
    const product = await productService.createProduct(req.body);
    res.status(httpStatus.CREATED).send(product);
});

/*
export const getProduct = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['productId'] === 'string') {
    const product = await productService.getProductById(new mongoose.Types.ObjectId(req.params['productId']));
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    res.send(product);
  }
});
  
*/