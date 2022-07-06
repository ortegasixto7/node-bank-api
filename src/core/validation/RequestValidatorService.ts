import { BadRequestException } from './exceptions/BadRequestException';
import { NotFoundException } from './exceptions/NotFoundException';
import { Response } from 'express';
import { ExceptionCodeEnum } from './ExceptionCodeEnum';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/config';

export class RequestValidatorService {
  async verifyToken(token: string | undefined): Promise<string> {
    if (!token) throw new BadRequestException(ExceptionCodeEnum.INVALID_AUTH_TOKEN);
    try {
      const tokenResult = jwt.verify(token?.replace('Bearer ', ''), JWT_SECRET);
      return (tokenResult as any).userId;
    } catch (error) {
      throw new BadRequestException(ExceptionCodeEnum.INVALID_AUTH_TOKEN);
    }
  }

  // async verifyTokenAndRole(token: string | undefined, roles: AuthUserRoleEnum[]): Promise<string> {
  //   if (!token) throw new BadRequestException(ExceptionCodeEnum.INVALID_AUTH_TOKEN);
  //   const result = await this.authService.verifyToken(token);
  //   if (!result) throw new BadRequestException(ExceptionCodeEnum.INVALID_AUTH_TOKEN);

  //   if (roles) {
  //     if (!roles.find((role) => role === result.role)) {
  //       throw new BadRequestException(ExceptionCodeEnum.UNAUTHORIZED);
  //     }
  //   }

  //   return result.uid;
  // }

  async responseWrapper(callbackFunction: Function, res: Response): Promise<any> {
    try {
      const response = await callbackFunction();
      res.status(200).json(response ? { data: response } : undefined);
    } catch (error) {
      if (error instanceof BadRequestException) {
        console.warn(`BAD_REQUEST ${error.message}`);
        res.status(400).json({ errorCode: error.message });
      } else if (error instanceof NotFoundException) {
        console.warn(`NOT_FOUND ${error.message}`);
        res.status(404).json({ errorCode: error.message });
      } else {
        console.error(error);
        res.status(500).json({ errorCode: 'INTERNAL_ERROR' });
      }
    }
  }
}
