
import { BadRequestException } from '@nestjs/common';

/**
 * Date Parser Utility
 * Handles various date formats, especially Chilean format (DD-MM-YYYY)
 */
export class DateParserUtil {
  /**
   * Parse date string to Date object
   * Supports multiple formats:
   * - DD-MM-YYYY (Chilean format)
   * - DD/MM/YYYY
   * - YYYY-MM-DD (ISO format)
   * - ISO 8601 datetime strings
   */
  static parseDate(dateStr: string | Date): Date | null {
    if (!dateStr) {
      return null;
    }

    if (dateStr instanceof Date) {
      return dateStr;
    }

    const str = dateStr.toString().trim();

    if (!str) {
      return null;
    }

    // Try ISO format first (YYYY-MM-DD)
    const isoMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
      const date = new Date(str);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }

    // Try Chilean format (DD-MM-YYYY or DD/MM/YYYY)
    const chileMatch = str.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})/);
    if (chileMatch) {
      const [, day, month, year] = chileMatch;
      const date = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
      );

      if (!isNaN(date.getTime())) {
        return date;
      }
    }

    // Try parsing as-is
    const date = new Date(str);
    if (!isNaN(date.getTime())) {
      return date;
    }

    throw new BadRequestException(
      `Formato de fecha inválido: ${str}. Use DD-MM-YYYY o YYYY-MM-DD`,
    );
  }

  /**
   * Validate date is not in the future
   */
  static validateNotFuture(date: Date, fieldName: string): void {
    if (date > new Date()) {
      throw new BadRequestException(
        `${fieldName} no puede ser una fecha futura`,
      );
    }
  }

  /**
   * Validate date is within a range
   */
  static validateDateRange(
    date: Date,
    minDate: Date,
    maxDate: Date,
    fieldName: string,
  ): void {
    if (date < minDate || date > maxDate) {
      throw new BadRequestException(
        `${fieldName} debe estar entre ${minDate.toISOString()} y ${maxDate.toISOString()}`,
      );
    }
  }
}
