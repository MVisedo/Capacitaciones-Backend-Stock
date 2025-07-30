import { consumeExchange } from '../rabbit.consumer';
import * as productService  from '../../product/product.service';
import { userService } from '../../../modules/user';
import { logger } from '../../../modules/logger';
import { stockService } from '../../../modules/stock';
import { authService } from '../../../modules/auth';
import { tokenService } from '../../../modules/token';
import moment from 'moment';


export async function startProductAndUserConsumer() {
  await consumeExchange('db-stock-queue','productAndUser.#', async (msg) => {
    const data = JSON.parse(msg.content.toString());
    const routingKey = msg.fields.routingKey;
    
    logger.info(`CONSUMED from db-stock-queue, whit key ${routingKey}`);
    switch (routingKey) {
      
      // Product
      case 'productAndUser.product.created':
        await productService.createProduct(data);
        await stockService.createStock({productId:data._id,cantidad:0})
        break;
      case 'productAndUser.product.updated':
        await productService.updateProductById(data.productId, data.updateBody);
        break;
      case 'productAndUser.product.deleted':
        await productService.deleteProductById(data);
        await stockService.deleteStockByProductId(data);
        break;

      // User 
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

      //Auth
      case 'productAndUser.auth.login':
        await authService.loginUserWithEmailAndPassword(data.email, data.password);
        break;
      case 'productAndUser.auth.logout':
        await authService.logout(data.refreshToken);
        break;
      
      case 'productAndUser.token.generated':
        const refreshTokenExpires = moment(data.refreshTokenExpires);
        await tokenService.saveToken(data.refreshToken,data.userId,refreshTokenExpires,data.tokenTypes);
        break;
      default:
        console.warn(`Unknown routing key: ${routingKey}`);
    }
    
    

  });
}