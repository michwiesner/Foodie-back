import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPaymentIntent } from 'src/common/interfaces/payment';
import { ICart } from 'src/common/interfaces/product';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY') as string,
      {
        apiVersion: '2022-11-15',
      },
    );
  }

  async createPaymentIntent({ products, total }: ICart): Promise<IPaymentIntent> {
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
