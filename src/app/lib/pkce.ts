/**
     * Generates a cryptographically secure random string of alphanumeric characters.
     * Used for PKCE code_verifier.
     * 
     * @param length - Desired length of the string (between 43 and 128).
     * @returns A string of random characters from a 62-character set (A-Z, a-z, 0-9).
     */
export const generateRandomString = (length: number): string => {
  const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values: Uint8Array = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc: string, x: number) => acc + possible[x % possible.length], '')
}


/**
 * Hashes a string using the SHA-256 algorithm.
 * Used to create the PKCE code_challenge from the code_verifier.
 * 
 * @param plain - The plain text string to hash.
 * @returns A Promise that resolves to an ArrayBuffer (the SHA-256 digest).
 */
export const sha256 = async (plain: string): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const data: Uint8Array = encoder.encode(plain);
  return crypto.subtle.digest('SHA-256', data);
}


/**
 * Converts a binary ArrayBuffer into a URL-safe Base64-encoded string.
 * Used to encode the SHA-256 hash of the code_verifier.
 * 
 * @param input - The ArrayBuffer to encode.
 * @returns A Base64 string with URL-safe characters.
 */
export const base64encode = (input: ArrayBuffer): string => {
  const uint8Array = new Uint8Array(input);
  const string = String.fromCharCode(...uint8Array);
  return btoa(string)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}
