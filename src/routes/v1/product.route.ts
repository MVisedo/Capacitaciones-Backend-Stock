


import { productController } from "@/modules/product";
import express,{ Router } from "express";

const router:Router = express.Router()
router.post('/',(req, res) => {
  res.send('Producto creado');});
router.get('/');
//router.get('/:id',productController.getProduct);
router.put('/:id');
router.delete('/:id')



export default router