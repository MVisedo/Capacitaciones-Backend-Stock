import httpStatus from "http-status";
import { catchAsync, pick } from "../utils";
import { productService } from ".";
import { Request, Response } from "express";
import { ApiError } from "../errors";
import mongoose from "mongoose";
import { IOptions } from "../paginate/paginate";
import { stockService } from "../stock";



export const createProduct = catchAsync(async (req: Request, res: Response) => {
    const product = await productService.createProduct(req.body);
    const stock = await stockService.createStock({productId:product.id,cantidad:0})
    res.status(httpStatus.CREATED).send({product,stock});
});


export const getProduct = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['productId'] === 'string') {
    const product = await productService.getProductById(new mongoose.Types.ObjectId(req.params['productId']));
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    res.send(product);
  }
});

export const getProductWithStock = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['productId'] === 'string') {
    const product = await productService.getProductById(new mongoose.Types.ObjectId(req.params['productId']));
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    const stock = await stockService.getStockByProductId(new mongoose.Types.ObjectId(req.params['productId']))
    if (!stock) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Stock not found');
    }
    res.send({product,stock});
  }
});

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'precio']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await productService.queryProducts(filter, options);
  res.send(result);
});

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['productId'] === 'string') {
    const product = await productService.updateProductById(new mongoose.Types.ObjectId(req.params['productId']), req.body);
    res.send(product);
  }
});

export const updateProductStock = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['productId'] === 'string') {
    const product = await productService.getProductById(new mongoose.Types.ObjectId(req.params['productId']));
    const stock = await stockService.updateStockByProductId(new mongoose.Types.ObjectId(req.params['productId']), req.body);
    res.send({product,stock});
  }
});

export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['productId'] === 'string') {
    await productService.deleteProductById(new mongoose.Types.ObjectId(req.params['productId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
