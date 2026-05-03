import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from "environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  keySize = 256;
  salt = CryptoJS.lib.WordArray.random(16);
  iv = CryptoJS.lib.WordArray.random(128 / 8);

  encrypt(data) {
    let encrypted;

    const key = CryptoJS.PBKDF2(environment.appEPK, this.salt, {
      keySize: this.keySize / 32,
      iterations: 100
    });

    encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: this.iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    data = CryptoJS.enc.Base64.stringify(this.salt.concat(this.iv).concat(encrypted.ciphertext));
    return data;
  }

  decrypt(data) {
    let decrypted;

    const key = CryptoJS.PBKDF2(environment.appEPK, this.salt, {
      keySize: this.keySize / 32,
      iterations: 100
    });

    decrypted = CryptoJS.AES.decrypt(data, key, {
      iv: this.iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    data = CryptoJS.enc.Base64.stringify(this.salt.concat(this.iv).concat(decrypted.ciphertext));
    return data;
  }
  tokenFromUI: string = "0123456789123456";
  encrypted: any = "";
  decrypted: string;

  request: string;
  responce: string;

  encryptUsingAES256(data) {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data), _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    this.encrypted = encrypted.toString();
    return this.encrypted;
  }
  decryptUsingAES256(data) {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);

    this.decrypted = CryptoJS.AES.decrypt(
      data, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);

    return this.decrypted
  }


  set(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
