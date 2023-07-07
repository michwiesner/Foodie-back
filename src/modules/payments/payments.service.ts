import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPaymentIntent } from 'src/common/interfaces/payment';
import { ICart, IProductCart } from 'src/common/interfaces/product';
import Stripe from 'stripe';
import { ProductsService } from '../products/products.service';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private productsService: ProductsService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY') as string,
      {
        apiVersion: '2022-11-15',
      },
    );
  }

  async getTotalPriceCart(products: IProductCart[]): Promise<number> {
    const productsIds = products.map(({ idMeal }) => idMeal);
    const fetchedProducts = await this.productsService.getProductsByIds(
      productsIds,
    );
    return fetchedProducts.reduce((total: number, { price, idMeal }: any) => {
      const [{ quantity }] = products.filter(
        ({ idMeal: idProductCart }) => idProductCart === idMeal,
      );
      return total + price * quantity;
    }, 0);
  }

  async createPaymentIntent({ products }: ICart): Promise<IPaymentIntent> {
    const total = await this.getTotalPriceCart(products);

    return this.stripe.paymentIntents
      .create({
        amount: total * 100,
        currency: this.configService.get<string>('STRIPE_CURRENCY') || 'usd',
      })
      .catch((error) => {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      });
  }
}
