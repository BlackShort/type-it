import crypto from 'crypto';

// In-memory user storage (replace with a database in production)
const users: { [email: string]: { passwordHash: string } } = {};

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function createUser(email: string, password: string): boolean {
  if (users[email]) {
    return false; // User already exists
  }
  users[email] = { passwordHash: hashPassword(password) };
  return true;
}

export function validateUser(email: string, password: string): boolean {
  const user = users[email];
  if (!user) {
    return false;
  }
  return user.passwordHash === hashPassword(password);
}

