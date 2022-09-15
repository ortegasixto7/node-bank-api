import { Account } from './core/account/Account';
import { CreateRequest as CreateAccountRequest } from './core/account/useCases/create/CreateRequest';
import { CreateUseCase as CreateAccountUseCase } from './core/account/useCases/create/CreateUseCase';
import { CreateTokenRequest } from './core/account/useCases/createToken/CreateTokenRequest';
import { CreateTokenUseCase } from './core/account/useCases/createToken/CreateTokenUseCase';
import { GetAllRequest } from './core/account/useCases/getAll/GetAllRequest';
import { GetAllUseCase } from './core/account/useCases/getAll/GetAllUseCase';
import { PaymentUseCase } from './core/card/useCases/payment/PaymentUseCase';
import { PaymentRequest } from './core/card/useCases/payment/PaymentRequest';
import { Currency } from './core/currency/Currency';
import { GetAllActiveUseCase } from './core/currency/useCases/getAllActive/GetAllActiveUseCase';
import { CurrencyConverterRequest } from './core/operation/useCases/currencyConverter/CurrencyConverterRequest';
import { CurrencyConverterUseCase } from './core/operation/useCases/currencyConverter/CurrencyConverterUseCase';
import { DepositRequest } from './core/operation/useCases/deposit/DepositRequest';
import { DepositUseCase } from './core/operation/useCases/deposit/DepositUseCase';
import { InternalTransferRequest } from './core/operation/useCases/internalTransfer/InternalTransferRequest';
import { InternalTransferUseCase } from './core/operation/useCases/internalTransfer/InternalTransferUseCase';
import { WithdrawRequest } from './core/operation/useCases/withdraw/WithdrawRequest';
import { WithdrawUseCase } from './core/operation/useCases/withdraw/WithdrawUseCase';
import { User } from './core/user/User';
import { DependencyInjector } from './external/dependencyInjector/DependencyInjector';
import { MongoDbClient } from './persistence/mongoDb/MongoDbClient';
import { Card } from './core/card/Card';
import { CreateUseCase as CreateCardUseCase } from './core/card/useCases/create/CreateUseCase';
import { CreateRequest as CreateCardRequest } from './core/card/useCases/create/CreateRequest';

MongoDbClient.initDb()
  .then(async () => {
    const getRandomItem = (data: any[]) => {
      return data[Math.floor(Math.random() * data.length)];
    };
    const getRandomNumber = () => Math.floor(Math.random() * 1000);
    const getRandomBoolean = () => Math.random() < 0.5;

    const usersCollection = MongoDbClient.getInstance().collection('users');
    const accountsCollection = MongoDbClient.getInstance().collection('accounts');
    const cardsCollection = MongoDbClient.getInstance().collection('cards');
    const usersResult = await usersCollection.find().toArray();

    const dependencyInjector = new DependencyInjector();
    const currencyPersistence = dependencyInjector.getCurrencyPersistence();
    const accountPersistence = dependencyInjector.getAccountPersistence();
    const userPersistence = dependencyInjector.getUserPersistence();
    const operationPersistence = dependencyInjector.getOperationPersistence();
    const cardPersistence = dependencyInjector.getCardPersistence();
    const cardService = dependencyInjector.getCardService();
    const currencies = (await new GetAllActiveUseCase(currencyPersistence).execute()) as Currency[];

    for (let index = 0; index < 100; index++) {
      const user = getRandomItem(usersResult) as User;

      currencies.map(async (item) => {
        try {
          await new CreateAccountUseCase(accountPersistence, currencyPersistence, userPersistence).execute(
            new CreateAccountRequest({ currencyCode: item.code, userId: user.id })
          );
          console.log(`${item.code} Account was created \n\n`);
        } catch (error) {}

        try {
          await new CreateCardUseCase(cardPersistence, accountPersistence, cardService).execute(
            new CreateCardRequest({
              currencyCode: item.code,
              userId: user.id
            })
          );
          console.log(`${item.code} Card was created \n\n`);
        } catch (error) {}
      });

      const userAccounts = (await new GetAllUseCase(accountPersistence).execute(new GetAllRequest({ userId: user.id }))) as Account[];
      userAccounts.map(async (item) => {
        if (!item.token) {
          try {
            await new CreateTokenUseCase(accountPersistence).execute(new CreateTokenRequest({ accountId: item.id, userId: user.id }));
          } catch (error) {}
        }

        if (getRandomBoolean()) {
          try {
            const depositAmount = getRandomNumber();
            await new DepositUseCase(operationPersistence, userPersistence, accountPersistence).execute(
              new DepositRequest({
                userId: user.id,
                currencyCode: item.currencyCode,
                amount: depositAmount
              })
            );
            console.log(`Deposit successful with the amount ${depositAmount} ${item.currencyCode} \n\n`);
          } catch (error) {}
        } else {
          const withdrawAmount = getRandomNumber();
          try {
            console.log(`Attempting to withdraw ${withdrawAmount} (${item.currencyCode}) `);
            await new WithdrawUseCase(operationPersistence, userPersistence, accountPersistence).execute(
              new WithdrawRequest({
                userId: user.id,
                currencyCode: item.currencyCode,
                amount: withdrawAmount
              })
            );
            console.log('Withdraw successful \n\n');
          } catch (error) {
            console.log(`Withdraw error => ${error} \n\n`);
          }
        }

        if (getRandomBoolean()) {
          const amountToConvert = getRandomNumber();
          const destinationCurrency = getRandomItem(currencies) as Currency;
          if (destinationCurrency.code !== item.currencyCode && amountToConvert > item.balance) {
            console.log(`Attempting to convert ${amountToConvert} (${item.currencyCode}) to (${destinationCurrency.code})`);
            try {
              await new CurrencyConverterUseCase(operationPersistence, userPersistence, accountPersistence, currencyPersistence).execute(
                new CurrencyConverterRequest({
                  userId: user.id,
                  initialCurrencyCode: item.currencyCode,
                  finaleCurrencyCode: destinationCurrency.code,
                  amount: amountToConvert
                })
              );
              console.log('Convertion successful \n\n');
            } catch (error) {
              console.log(`Convertion error => ${error} \n\n`);
            }
          }
        } else {
          const amountToTransfer = getRandomNumber();
          const accountsResult = await accountsCollection.find({ currencyCode: item.currencyCode }).toArray();
          const randomAccount = getRandomItem(accountsResult) as Account;
          console.log(
            `Attempting to send a transfer in ${item.currencyCode} to account number (${randomAccount.number}) with the amount (${amountToTransfer})`
          );
          try {
            await new InternalTransferUseCase(operationPersistence, userPersistence, accountPersistence).execute(
              new InternalTransferRequest({
                userId: user.id,
                currencyCode: item.currencyCode,
                recipientAccountNumber: randomAccount.number,
                amount: amountToTransfer
              })
            );
            console.log('Transfer successful \n\n');
          } catch (error) {
            console.log(`Transfer error => ${error} \n\n`);
          }
        }

        if (getRandomBoolean()) {
          const amountToReceive = getRandomNumber();
          const cardsResult = await cardsCollection.find({ currencyCode: item.currencyCode }).toArray();
          const randomCard = getRandomItem(cardsResult) as Card;
          if (randomCard) {
            console.log(`Attempting to charge a card with number (${randomCard.number}) with the amount (${amountToReceive})`);
            try {
              await new PaymentUseCase(accountPersistence, cardPersistence, userPersistence, operationPersistence).execute(
                new PaymentRequest({
                  cardNumber: randomCard.number,
                  expirationYear: randomCard.expirationYear,
                  expirationMonth: randomCard.expirationMonth,
                  currencyCode: randomCard.currencyCode,
                  verificationCode: randomCard.verificationCode,
                  receiverAccountToken: item.token,
                  amount: amountToReceive
                })
              );
              console.log('Card payment successful \n\n');
            } catch (error) {
              console.log(`Card payment error => ${error} \n\n`);
            }
          }
        }

        // End
      });
    }
  })
  .catch((err) => console.error(err));
