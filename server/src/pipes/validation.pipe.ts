/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CustomError } from '@/filters/CustomError';
type Constructor = new (...args: unknown[]) => unknown;

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const validationErrors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (validationErrors.length > 0) {
      // Map to Record<string, string> — one message per field
      const errors: Record<string, string> = {};

      for (const err of validationErrors) {
        if (err.constraints) {
          // Take the last constraint message (most specific)
          const messages = Object.values(err.constraints);
          errors[err.property] = messages[messages.length - 1];
        }

        // Handle nested objects (e.g. @ValidateNested())
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
        true, // safe = true so it reaches the frontend in prod
        'Please fix the highlighted fields',
        errors,
      );
    }

    return object;
  }

  private toValidate(metatype: Constructor): boolean {
    const primitives: Constructor[] = [String, Boolean, Number, Array, Object];
    return !primitives.includes(metatype);
  }
}
