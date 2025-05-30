import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ServiceUnavailableException, ExternalServiceException } from '../exceptions';

/**
 * Interceptor para manejar errores de timeout y conexión
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly timeoutMs = 30000) {} // 30 segundos por defecto

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(this.timeoutMs), // Limitamos el tiempo de respuesta
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException(
            'La solicitud ha excedido el tiempo máximo de espera. Por favor, inténtelo de nuevo más tarde.'
          ));
        }

        // Errores de conexión a servicios externos
        if (err.name === 'FetchError' || err.code === 'ECONNREFUSED') {
          const service = err.message.match(/connecting to ([^:]+)/)?.[1] || 'servicio externo';
          return throwError(() => new ExternalServiceException(
            service, 
            `No se pudo establecer conexión con ${service}. Por favor, inténtelo más tarde.`
          ));
        }

        // Si el servicio responde con errores 5xx
        if (err.status >= 500 && err.status < 600) {
          return throwError(() => new ServiceUnavailableException(
            'El servicio no está respondiendo correctamente. Por favor, inténtelo más tarde.'
          ));
        }

        return throwError(() => err);
      }),
    );
  }
}
