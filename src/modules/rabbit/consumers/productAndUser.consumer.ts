import { consumeExchange } from '../rabbit.consumer';
import * as productService  from '../../product/product.service';
import { userService } from '@/modules/user';
import { logger } from '@/modules/logger';
import { stockService } from '@/modules/stock';


export async function startProductAndUserConsumer() {
  await consumeExchange('db-stock-queue','productAndUser.#', async (msg) => {
    const data = JSON.parse(msg.content.toString());
    const routingKey = msg.fields.routingKey;
    

    switch (routingKey) {
      case 'productAndUser.product.created':
        await productService.createProduct(data);
        await stockService.createStock({productId:data._id,cantidad:0})
        break;
      case 'productAndUser.product.updated':
        await productService.updateProductById(data.productId, data.updateBody);
        break;
      case 'productAndUser.product.deleted':
        await productService.deleteProductById(data);
        break;
      case 'productAndUser.user.created':
        await userService.createUser(data);
        break;
      case 'productAndUser.user.registered':
        await userService.registerUser(data);
        break;
      case 'productAndUser.user.updated':
        await userService.updateUserById(data.userId, data.updateBody);
        break;
      case 'productAndUser.user.deleted':
        await userService.deleteUserById(data);
        break;
      default:
        console.warn(`Unknown routing key: ${routingKey}`);
    }
    logger.info(`CONSUMED from db-stock-queue, whit key ${routingKey}`);
    

  });
}