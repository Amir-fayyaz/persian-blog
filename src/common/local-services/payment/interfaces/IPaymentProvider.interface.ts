import { IRequestPayment } from './IRequestPayment.interface';
import { IVerifyPayment } from './IVerifyPayment.interface';

export interface IPayemntProvider {
  RequestPayment(request: IRequestPayment): Promise<any>;
  VerifyPayment(verfiy: IVerifyPayment): Promise<any>;
}
