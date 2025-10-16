

import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * Validador de RUT chileno
 * Formato: XX.XXX.XXX-X o XXXXXXXX-X
 */
export function IsValidChileanRut(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidChileanRut',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value || typeof value !== 'string') {
            return false;
          }

          // Remove dots and dashes
          const cleanRut = value.replace(/\./g, '').replace(/-/g, '');

          // Check length (7-8 digits + 1 verification digit)
          if (cleanRut.length < 8 || cleanRut.length > 9) {
            return false;
          }

          const body = cleanRut.slice(0, -1);
          const verifier = cleanRut.slice(-1).toUpperCase();

          // Calculate verification digit
          let sum = 0;
          let multiplier = 2;

          for (let i = body.length - 1; i >= 0; i--) {
            sum += parseInt(body[i]) * multiplier;
            multiplier = multiplier === 7 ? 2 : multiplier + 1;
          }

          const expectedVerifier = 11 - (sum % 11);
          let calculatedVerifier: string;

          if (expectedVerifier === 11) {
            calculatedVerifier = '0';
          } else if (expectedVerifier === 10) {
            calculatedVerifier = 'K';
          } else {
            calculatedVerifier = expectedVerifier.toString();
          }

          return verifier === calculatedVerifier;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid Chilean RUT (e.g., 12.345.678-9 or 12345678-9)`;
        },
      },
    });
  };
}
