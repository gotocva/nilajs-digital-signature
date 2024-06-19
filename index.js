/*
Copyright sivabharathy.in All Rights Reserved.
*/
const crypto = require('crypto');
const { randomBytes } = require('crypto');
const { ec } = require('elliptic');
const EC = new ec('secp256k1');
/**
 * 
 * @returns 
 */
function generateWallet() {
  const privateKey = randomBytes(32).toString('hex');
  const keyPair = EC.keyFromPrivate(privateKey);
  const publicKey = keyPair.getPublic('hex');
  return { publicKey, privateKey };
}
/**
 * 
 * @param {*} publicKey 
 * @returns Boolean
 */
function checkPublicKeyValid(publicKey) {
  try {
    // Attempt to create a keyPair from the provided public key
    const keyPair = EC.keyFromPublic(publicKey, 'hex');
    // Validate the key by getting its public key and comparing
    const isValid = keyPair.getPublic('hex') === publicKey;
    return { valid: isValid, public_key: publicKey }
  } catch (error) {
    // If an error occurs, the public key is invalid
    return { valid: false, public_key: publicKey }
  }
}
/**
 * 
 * @param {*} privateKey 
 * @param {*} data 
 * @returns Object
 */
function signData(privateKey, data) {
  const keyPair = EC.keyFromPrivate(privateKey);
  const msgHash = crypto.createHash('sha256').update(data).digest();
  const signature = keyPair.sign(msgHash);
  // return signature with data signed
  return {
    data,
    signature: {
        r: signature.r.toString('hex'),
        s: signature.s.toString('hex')
    }
  }
}
/**
 * 
 * @param {*} publicKey 
 * @param {*} data 
 * @param {*} signature 
 * @returns 
 */
function verifySignature(publicKey, data, signature) {
  const keyPair = EC.keyFromPublic(publicKey, 'hex');
  const msgHash = crypto.createHash('sha256').update(data).digest();

  const isVerified = keyPair.verify(msgHash, {
      r: signature.r,
      s: signature.s
  });

  return {
    data,
    signature,
    is_verified: isVerified
  }
}
module.exports = {
  generateWallet,
  checkPublicKeyValid,
  signData,
  verifySignature
}