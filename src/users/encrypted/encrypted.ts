import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

export const encrptedPassWord = async (psd: string) => {
  //2.hash 加密密码

  //创建一个随机的值,生成8个字节  tostring("hex")转换成字符数字
  const salt = randomBytes(8).toString("hex");
  //对密码进行hash   32个字节
  const hash = (await scrypt(psd, salt, 32)) as Buffer;
  //组合hash和salt
  const result = salt + "." + hash.toString("hex");
  return result;
};
