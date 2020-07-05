const aes256 = require('aes256');
const key = 'UVENTOS';

function toAES256(message) {
    return aes256.encrypt(key, message);
}

function fromAES256(encryptedMessage) {
    return aes256.decrypt(key, encryptedMessage);
}

module.exports = {
    toAES256,
    fromAES256
};
