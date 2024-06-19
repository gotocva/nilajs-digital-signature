# @nilajs/digital-signature

A digital signature is a cryptographic mechanism used to verify the authenticity and integrity of digital messages or documents. It provides assurances that the message was indeed created by a particular entity (authentication) and that the message has not been altered or tampered with since it was signed (integrity).

A simple library for generating elliptic curve (secp256k1) key pairs, signing data, verifying signatures, and validating public keys. 

## Installation

You can install the package via npm:

```sh
npm install @nilajs/digital-signature
```

## Usage

### Import the Library

```javascript
const {
  generateWallet,
  checkPublicKeyValid,
  signData,
  verifySignature
} = require('@nilajs/digital-signature');
```

### Generate Wallet

Generate a new wallet (elliptic curve (secp256k1) key pair) :

```javascript
const { publicKey, privateKey } = generateWallet();
console.log(`Public Key: ${publicKey}`);
console.log(`Private Key: ${privateKey}`);
```

### Validate Public Key

Check if a given public key is valid:

```javascript
const publicKey = 'YOUR_PUBLIC_KEY';
const result = checkPublicKeyValid(publicKey);
console.log(result); // { valid: true/false, public_key: 'YOUR_PUBLIC_KEY' }
```

### Sign Data

Sign a piece of data with a private key:

```javascript
const privateKey = 'YOUR_PRIVATE_KEY';
const data = 'This is the data to be signed';
const signatureObject = signData(privateKey, data);
console.log(signatureObject);
/*
{
  data: 'This is the data to be signed',
  signature: {
    r: 'SIGNATURE_R',
    s: 'SIGNATURE_S'
  }
}
*/
```

### Verify Signature

Verify the signature of the data with a public key:

```javascript
const publicKey = 'YOUR_PUBLIC_KEY';
const data = 'This is the data to be signed';
const signature = {
  r: 'SIGNATURE_R',
  s: 'SIGNATURE_S'
};
const verificationResult = verifySignature(publicKey, data, signature);
console.log(verificationResult);
/*
{
  data: 'This is the data to be signed',
  signature: {
    r: 'SIGNATURE_R',
    s: 'SIGNATURE_S'
  },
  is_verified: true/false
}
*/
```

## API Reference

### `generateWallet()`

Generates a new elliptic curve (secp256k1) key pair.

**Returns:**
- `Object`: An object containing the `publicKey` and `privateKey` as hexadecimal strings.

### `checkPublicKeyValid(publicKey)`

Checks if a given public key is valid.

**Parameters:**
- `publicKey` (`string`): The public key to validate.

**Returns:**
- `Object`: An object containing:
  - `valid` (`boolean`): Whether the public key is valid.
  - `public_key` (`string`): The provided public key.

### `signData(privateKey, data)`

Signs a piece of data with a private key.

**Parameters:**
- `privateKey` (`string`): The private key to sign with.
- `data` (`string`): The data to sign.

**Returns:**
- `Object`: An object containing the signed `data` and `signature` (with `r` and `s` as hexadecimal strings).

### `verifySignature(publicKey, data, signature)`

Verifies the signature of the data with a public key.

**Parameters:**
- `publicKey` (`string`): The public key to verify with.
- `data` (`string`): The signed data.
- `signature` (`Object`): The signature object containing `r` and `s` as hexadecimal strings.

**Returns:**
- `Object`: An object containing:
  - `data` (`string`): The signed data.
  - `signature` (`Object`): The signature object.
  - `is_verified` (`boolean`): Whether the signature is valid.

## License

MIT
```

### Summary

This `README.md` provides an overview of the functions in your `@nilajs/digital-signature` package, along with installation instructions, usage examples, and an API reference. This documentation will help users understand how to use your package effectively.