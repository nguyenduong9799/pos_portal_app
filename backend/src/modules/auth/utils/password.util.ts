import { createHash } from 'crypto';

export class PasswordUtil {
  /**
   * Hash password using SHA256 and convert to Base64
   * This matches the C# implementation:
   * SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(rawPassword))
   * Convert.ToBase64String(bytes)
   */
  static hashPassword(rawPassword: string): string {
    const hash = createHash('sha256');
    hash.update(rawPassword, 'utf8');
    return hash.digest('base64');
  }

  /**
   * Compare raw password with hashed password
   */
  static comparePassword(rawPassword: string, hashedPassword: string): boolean {
    const hashedRaw = this.hashPassword(rawPassword);
    return hashedRaw === hashedPassword;
  }
}
