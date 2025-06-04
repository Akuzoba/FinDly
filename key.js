import crypto from 'crypto';


const key = crypto.randomBytes(32).toString('hex'); // Generate a random 32-byte key
console.log(key);