import crypto from 'crypto';

export const generateUsername = (name: string) => {
  const base = name.toLowerCase().replace(/\s+/g, '').substring(0, 6);
  const suffix = Math.floor(1000 + Math.random() * 9000); // 4 dígitos
  return `${base}${suffix}`;
};

export const generatePassword = () => {
  return crypto.randomBytes(6).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);
};
