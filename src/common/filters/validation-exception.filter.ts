import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    if (status === 400) {        
      const errors:any = exception.getResponse() as ValidationError | ValidationError[];

      response.status(status).json({
        statusCode: status,
        message: 'Validation failed',
        errors: errors.message,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
    }
  }

  private flattenValidationErrors(errors: ValidationError | ValidationError[]): string[] {
    if (Array.isArray(errors)) {
      return errors.reduce((acc: string[], error: ValidationError) => {
        if (error.children && error.children.length > 0) {
          acc.push(...this.flattenValidationErrors(error.children));
        } else {
          Object.values(error.constraints).forEach((message) => acc.push(message));
        }
        return acc;
      }, []);
    } else if (errors.constraints) {
      return Object.values(errors.constraints);
    } else {
      return [];
    }
  }
}
