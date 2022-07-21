import { randomUUID } from 'crypto';

export class Operation {
  id: string = randomUUID();
  user: OperationUser = {
    firstName: '',
    id: '',
    lastName: ''
  };
  amount: number = 0;
  currencyCode: string = '';
  type: OperationTypeEnum = OperationTypeEnum.DEPOSIT;
  createdAt: number = Date.now();
}

export class OperationUser {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
}

export enum OperationTypeEnum {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  TRANSFER = 'TRANSFER'
}
