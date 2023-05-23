import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

type ResponseWithMessage = { message: [] };

const getErrorMessage = (e: Error) => {
  const isHttpException = e instanceof HttpException;

  const msgArr = isHttpException
    ? (e?.getResponse() as ResponseWithMessage)?.message
    : null;
  const isMsgArr = Array.isArray(msgArr);

  return isMsgArr ? msgArr.join(', ') : e?.message;
};

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((e) => {
        console.error(e);
        const message = getErrorMessage(e) || 'Internal server error';
        const status = +e?.getStatus?.() || 500;

        return throwError(() => new HttpException(message, status));
      }),
    );
  }
}
