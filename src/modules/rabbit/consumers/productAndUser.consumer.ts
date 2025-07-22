import { consumeExchange } from '../rabbit.consumer';
import * as productService  from '../../product/product.service';


export async function startProductAndUserConsumer() {
  await consumeExchange('db-stock-queue','productAndUser.#', async (msg) => {
    const data = JSON.parse(msg.content.toString());
    const routingKey = msg.fields.routingKey;
    

    switch (routingKey) {
      case 'productAndUser.product.created':
        await productService.createProduct(data);
        break;
      case 'productAndUser.product.updated':
        await productService.updateProductById(data.productId, data.updateBody);
        break;
      case 'productAndUser.product.deleted':
        await productService.deleteProductById(data);
        break;
      default:
        console.warn(`Unknown routing key: ${routingKey}`);
    }
    

  });
}