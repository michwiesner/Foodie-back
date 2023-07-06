export interface AmountDetails {
  tip?: any;
}

export interface IPaymentIntent {
  amount: number;
  amount_capturable: number;
  amount_details?: AmountDetails | undefined;
  amount_received: number;
  application: any;
  application_fee_amount: number | null;
  automatic_payment_methods: any;
  canceled_at: number | null;
  cancellation_reason: any;
  capture_method: string;
  client_secret: string | null;
  confirmation_method: string;
  created: number;
  currency: string;
  customer: any;
  description: string | null;
  id: string;
  invoice: any;
  last_payment_error: any;
  latest_charge?: any;
  livemode: boolean;
  metadata: any;
  next_action: any;
  object: string;
  on_behalf_of: any;
  payment_method: any;
  payment_method_options: any;
  payment_method_types: string[];
  processing: any;
  receipt_email: string | null;
  review: any;
  setup_future_usage: any;
  shipping: any;
  source: any;
  statement_descriptor: string | null;
  statement_descriptor_suffix: string | null;
  status: string;
  transfer_data: any;
  transfer_group: string | null;
}
