import crypto from 'crypto'

export function encrypt(value: string, encryptionKey: string): string {
  // Convert key string to a buffer
  const key = Buffer.from(encryptionKey, 'hex') // use 'base64' if your key is in base64 format

  // Create a new random initialization vector
  const iv = crypto.randomBytes(16)

  // Create a new cipher using the key and IV
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)

  // Encrypt the value
  const encrypted = Buffer.concat([
    cipher.update(value, 'utf8'),
    cipher.final(),
  ])

  // Combine the IV and the encrypted value
  const combined = Buffer.concat([iv, encrypted])

  // Return the combined buffer as a base64 string
  return combined.toString('base64')
}

export function decrypt(value: string, encryptionKey: string): string {
  // Convert key string to a buffer
  const key = Buffer.from(encryptionKey, 'hex') // use 'base64' if your key is in base64 format

  // Convert the base64 string back to a buffer
  const combined = Buffer.from(value, 'base64')

  // Extract the IV and the encrypted value from the combined buffer
  const iv = (combined as Uint8Array).subarray(0, 16)
  const encrypted = (combined as Uint8Array).subarray(16)

  // Create a decipher using the key and IV
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)

  // Decrypt the value
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ])

  // Return the decrypted value as a string
  return decrypted.toString('utf8')
}

export function generateEncryptionKey(): string {
  // Generate a random 256-bit (32 bytes) key
  const key = crypto.randomBytes(32)

  // Convert the key to a hexadecimal string and return it
  return key.toString('hex')
}
