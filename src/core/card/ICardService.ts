export interface ICardService {
  getNumber(): string;
  getVerificationCode(): string;
  getExpirationYear(): string;
  getExpirationMonth(): string;
  getExpirationTimestamp(expirationYear: number, expirationMonth: number): number;
}
