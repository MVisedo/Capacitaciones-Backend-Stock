import { Request, Response } from "express";
import { stockService } from ".";
import { catchAsync } from "../utils";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { ApiError } from "../errors";


export const createStock = catchAsync(async (req: Request, res: Response) => {
    const stock = await stockService.createStock(req.body)
    res.status(httpStatus.CREATED).send({stock});
});

export const getStock = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['productId'] === 'string') {
    const stock = await stockService.getStockByProductId(new mongoose.Types.ObjectId(req.params['productId']));
    if (!stock) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Stock not found');
    }
    res.send(stock);
  }
});


export const updateStock = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['productId'] === 'string') {
    const stock = await stockService.updateStockByProductId(new mongoose.Types.ObjectId(req.params['productId']), req.body);
    res.send(stock);
  }
});


export const deleteStock = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['productId'] === 'string') {
    await stockService.deleteStockByProductId(new mongoose.Types.ObjectId(req.params['productId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});