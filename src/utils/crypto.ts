import CryptoJS from "crypto-js";

function encrypt(text: string, key: string): string {
  const encrypted = CryptoJS.AES.encrypt(text, key);
  return encrypted.toString();
}
function decrypt(encrypted: string, key: string): string {
  const decrypted = CryptoJS.AES.decrypt(encrypted, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function generateKey(): string {
  return CryptoJS.lib.WordArray.random(32).toString();
}

export { encrypt, decrypt, generateKey };
