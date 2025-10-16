
import { BadRequestException } from '@nestjs/common';

/**
 * Currency Parser Utility
 * Handles parsing of currency values (CLP, UF)
 */
export class CurrencyParserUtil {
  /**
   * Parse currency string to decimal number
   * Handles formats like:
   * - 1234567
   * - 1.234.567
   * - 1,234,567
   * - $1.234.567
   * - CLP 1.234.567
   */
  static parseAmount(amountStr: string | number): number {
    if (typeof amountStr === 'number') {
      return amountStr;
    }

    if (!amountStr) {
      throw new BadRequestException('Monto no puede estar vacío');
    }

    // Remove currency symbols and text
    let cleaned = amountStr
      .toString()
      .trim()
      .replace(/[$€£¥₹CLP UF]/gi, '')
      .trim();

    // Replace thousand separators (. or ,) but keep decimal separator
    // Check if the last occurrence of . or , is the decimal separator
    const lastDotIndex = cleaned.lastIndexOf('.');
    const lastCommaIndex = cleaned.lastIndexOf(',');

    if (lastDotIndex > lastCommaIndex) {
      // Dot is decimal separator
      cleaned = cleaned.replace(/,/g, '').replace(/\./g, (_match, offset) => {
        return offset === lastDotIndex ? '.' : '';
      });
    } else if (lastCommaIndex > lastDotIndex) {
      // Comma is decimal separator
      cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    } else {
      // No decimal separator, just remove all dots and commas
      cleaned = cleaned.replace(/[.,]/g, '');
    }

    const amount = parseFloat(cleaned);

    if (isNaN(amount)) {
      throw new BadRequestException(
        `Formato de monto inválido: ${amountStr}`,
      );
    }

    if (amount < 0) {
      throw new BadRequestException('El monto no puede ser negativo');
    }

    return amount;
  }

  /**
   * Parse currency type
   */
  static parseCurrency(currencyStr: string): string {
    if (!currencyStr) {
      return 'CLP'; // Default to Chilean Peso
    }

    const normalized = currencyStr.toString().trim().toUpperCase();

    if (['CLP', 'UF', 'USD', 'EUR'].includes(normalized)) {
      return normalized;
    }

    return 'CLP'; // Default to Chilean Peso
  }

  /**
   * Validate amount is positive
   */
  static validatePositive(amount: number, fieldName: string): void {
    if (amount <= 0) {
      throw new BadRequestException(`${fieldName} debe ser mayor que cero`);
    }
  }
}
