import { randomUUID } from 'crypto';

export class Operation {
  id: string = randomUUID();
  number: string = getRandomNumber();
  amount: number = 0;
  currencyCode: string = '';
  convertion: null | OperationConvertion = null;
  type: OperationTypeEnum = OperationTypeEnum.DEPOSIT;
  createdAt: number = Date.now();
  commission: number = 0;
  sender: OperationUser = {
    firstName: '',
    id: '',
    lastName: '',
    accountNumber: ''
  };
  recipient: OperationUser = {
    firstName: '',
    id: '',
    lastName: '',
    accountNumber: ''
  };
}

function getRandomNumber(): string {
  const date = Date.now().toString();
  return date.substring(date.length - 6, date.length);
}

export class OperationUser {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  accountNumber: string = '';
}

export class OperationConvertion {
  rate: number = 0;
  convertedAmount: number = 0;
  convertedCurrencyCode: string = '';
}

export enum OperationTypeEnum {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  CONVERTION = 'CONVERTION',
  INTERNAL_TRANSFER = 'INTERNAL_TRANSFER',
  EXTERNAL_TRANSFER = 'EXTERNAL_TRANSFER',
  CARD_PAYMENT = 'CARD_PAYMENT'
}
