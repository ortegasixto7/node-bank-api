import { randomUUID } from 'crypto';
import { ConvertionOperation } from './models/ConvertionOperation';
import { UserOperation } from './models/UserOperation';
import { CardPaymentOperation } from './models/CardPaymentOperation';

export class Operation {
  id: string = randomUUID();
  number: string = getRandomNumber();
  amount: number = 0;
  currencyCode: string = '';
  convertion: null | ConvertionOperation = null;
  cardPayment: null | CardPaymentOperation = null;
  type: OperationTypeEnum = OperationTypeEnum.DEPOSIT;
  createdAt: number = Date.now();
  commission: number = 0;
  sender: UserOperation = {
    firstName: '',
    id: '',
    lastName: '',
    userName: '',
    accountNumber: ''
  };
  recipient: UserOperation = {
    firstName: '',
    id: '',
    lastName: '',
    userName: '',
    accountNumber: ''
  };
}

function getRandomNumber(): string {
  const date = Date.now().toString();
  return date.substring(date.length - 6, date.length);
}

export enum OperationTypeEnum {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  CONVERTION = 'CONVERTION',
  INTERNAL_TRANSFER = 'INTERNAL_TRANSFER',
  EXTERNAL_TRANSFER = 'EXTERNAL_TRANSFER',
  CARD_PAYMENT = 'CARD_PAYMENT'
}
