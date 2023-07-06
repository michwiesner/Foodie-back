import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ICart } from 'src/common/interfaces/product';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @Post('payment-intent')
  async createPayment(
    @Body()
    paymentRequestBody: ICart,
  ) {
    return this.paymentService.createPaymentIntent(paymentRequestBody);
  }
}
