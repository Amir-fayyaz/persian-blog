export interface IRequestPayment {
  amount: number;
  mobile: string;
  description: string;
  callBackUrl: string;
}
