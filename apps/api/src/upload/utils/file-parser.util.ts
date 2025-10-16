
import * as XLSX from 'xlsx';
import csv from 'csv-parser';
import { Readable } from 'stream';
import { BadRequestException } from '@nestjs/common';
import { FileType } from '../interfaces/upload-result.interface';

/**
 * File Parser Utility
 * Handles parsing of CSV, Excel, and JSON files
 */
export class FileParserUtil {
  /**
   * Determine file type from file extension or mime type
   */
  static getFileType(originalName: string, mimeType: string): FileType {
    const extension = originalName.split('.').pop()?.toLowerCase();

    if (extension === 'csv' || mimeType === 'text/csv') {
      return FileType.CSV;
    }

    if (
      extension === 'xlsx' ||
      mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      return FileType.XLSX;
    }

    if (extension === 'json' || mimeType === 'application/json') {
      return FileType.JSON;
    }

    throw new BadRequestException(
      'Tipo de archivo no soportado. Use CSV, XLSX o JSON.',
    );
  }

  /**
   * Parse CSV file
   */
  static async parseCSV(buffer: Buffer): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      const stream = Readable.from(buffer);

      stream
        .pipe(
          csv({
            mapHeaders: ({ header }) => header.trim(),
            mapValues: ({ value }) => value.trim(),
          }),
        )
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) =>
          reject(new BadRequestException(`Error al parsear CSV: ${error.message}`)),
        );
    });
  }

  /**
   * Parse Excel file
   */
  static parseExcel(buffer: Buffer): any[] {
    try {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];

      if (!sheetName) {
        throw new BadRequestException('El archivo Excel está vacío');
      }

      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, {
        raw: false,
        defval: '',
      });

      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      throw new BadRequestException(`Error al parsear Excel: ${message}`);
    }
  }

  /**
   * Parse JSON file
   */
  static parseJSON(buffer: Buffer): any[] {
    try {
      const content = buffer.toString('utf-8');
      const data = JSON.parse(content);

      if (!Array.isArray(data)) {
        throw new BadRequestException(
          'El archivo JSON debe contener un array de objetos',
        );
      }

      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      throw new BadRequestException(`Error al parsear JSON: ${message}`);
    }
  }

  /**
   * Main parse method - delegates to specific parser based on file type
   */
  static async parse(
    buffer: Buffer,
    originalName: string,
    mimeType: string,
  ): Promise<any[]> {
    const fileType = this.getFileType(originalName, mimeType);

    switch (fileType) {
      case FileType.CSV:
        return this.parseCSV(buffer);
      case FileType.XLSX:
        return this.parseExcel(buffer);
      case FileType.JSON:
        return this.parseJSON(buffer);
      default:
        throw new BadRequestException('Tipo de archivo no soportado');
    }
  }
}
