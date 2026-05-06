import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CustomError } from '@/filters/CustomError';

type Constructor = new (...args: unknown[]) => unknown;

const PRIMITIVES: Constructor[] = [String, Boolean, Number, Array, Object];

@Injectable()
export class CustomValidationPipe implements PipeTransform<unknown> {
  async transform(value: unknown, { metatype, type }: ArgumentMetadata) {
    // only validate @Body() — skip @Param(), @Query(), and custom decorators (JWT user, etc.)
    if (type !== 'body') return value;

    if (!metatype || PRIMITIVES.includes(metatype as Constructor)) {
      return value;
    }

    if (value === undefined || value === null) {
      return value;
    }

    const object = plainToInstance(metatype as Constructor, value);

    const validationErrors = await validate(object as object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (validationErrors.length === 0) return object;

    const errors: Record<string, string> = {};

    for (const err of validationErrors) {
      if (err.constraints) {
        const messages = Object.values(err.constraints);
        errors[err.property] = messages[messages.length - 1];
      }

      if (err.children?.length) {
        for (const child of err.children) {
          if (child.constraints) {
            const messages = Object.values(child.constraints);
            errors[`${err.property}.${child.property}`] =
              messages[messages.length - 1];
          }
        }
      }
    }

    throw new CustomError(
      'Validation failed',
      422,
      'validation error',
      true,
      'Please fix the highlighted fields',
      errors,
    );
  }
}
