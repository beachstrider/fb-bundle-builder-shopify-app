const crypto = require('crypto')

// AES = 16
const IV_LENGTH = 16
const ALGORITHM = 'aes-128-cbc'

const shopifyMultipass = (secret, returnTo) => {
  const key = crypto.createHash('sha256').update(secret).digest()
  const encryptedKey = key.slice(0, 16)
  const signatureKey = key.slice(16, 32)

  const generateToken = (payload) => {
    const currentPayload = payload.created_at
      ? payload
      : { ...payload, created_at: new Date().toISOString() }
    const cipherText = encrypt(JSON.stringify(currentPayload))

    const token = Buffer.concat([cipherText, sign(cipherText)]).toString(
      'base64'
    )

    return token.replace(/\+/g, '-').replace(/\//g, '_')
  }

  const encrypt = (string) => {
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(ALGORITHM, encryptedKey, iv)

    return Buffer.concat([iv, cipher.update(string, 'utf8'), cipher.final()])
  }

  const sign = (data) => {
    return crypto.createHmac('sha256', signatureKey).update(data).digest()
  }

  const url = (shopifyDomain, payload) => {
    return `https://${shopifyDomain}/account/login/multipass/${generateToken(
      payload
    )}`
  }

  return {
    generateToken,
    encrypt,
    sign,
    url
  }
}

module.exports = shopifyMultipass
