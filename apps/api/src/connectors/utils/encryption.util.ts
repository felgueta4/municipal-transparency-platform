
import * as crypto from 'crypto';

/**
 * Encryption Utility
 * Encrypts and decrypts sensitive data like API keys
 */

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;
const IV_LENGTH = 16;
const TAG_LENGTH = 16;

export class EncryptionUtil {
  private static key: Buffer;

  /**
   * Initialize the encryption key from environment variable
   */
  static initialize(encryptionKey?: string) {
    const key = encryptionKey || process.env.ENCRYPTION_KEY;
    if (!key) {
      throw new Error('ENCRYPTION_KEY is not defined');
    }
    // Create a 32-byte key from the provided key
    this.key = crypto.scryptSync(key, 'salt', KEY_LENGTH);
  }

  /**
   * Encrypt a string
   */
  static encrypt(text: string): string {
    if (!this.key) {
      this.initialize();
    }

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, this.key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const tag = cipher.getAuthTag();

    // Combine iv + tag + encrypted data
    return iv.toString('hex') + tag.toString('hex') + encrypted;
  }

  /**
   * Decrypt a string
   */
  static decrypt(encryptedText: string): string {
    if (!this.key) {
      this.initialize();
    }

    // Extract iv, tag, and encrypted data
    const iv = Buffer.from(encryptedText.slice(0, IV_LENGTH * 2), 'hex');
    const tag = Buffer.from(
      encryptedText.slice(IV_LENGTH * 2, IV_LENGTH * 2 + TAG_LENGTH * 2),
      'hex',
    );
    const encrypted = encryptedText.slice(IV_LENGTH * 2 + TAG_LENGTH * 2);

    const decipher = crypto.createDecipheriv(ALGORITHM, this.key, iv);
    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  /**
   * Hash a string (one-way)
   */
  static hash(text: string): string {
    return crypto.createHash('sha256').update(text).digest('hex');
  }
}
