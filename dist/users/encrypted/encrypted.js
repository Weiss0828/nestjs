"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrptedPassWord = void 0;
const crypto_1 = require("crypto");
const util_1 = require("util");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
const encrptedPassWord = async (psd) => {
    const salt = (0, crypto_1.randomBytes)(8).toString("hex");
    const hash = (await scrypt(psd, salt, 32));
    const result = salt + "." + hash.toString("hex");
    return result;
};
exports.encrptedPassWord = encrptedPassWord;
//# sourceMappingURL=encrypted.js.map