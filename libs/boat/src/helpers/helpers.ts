import { v4 as uuidv4 } from 'uuid';
import { GenericException, ValidationFailed, ForbiddenException, NotFoundException } from '../exceptions';
import { TimebasedRefId } from '../interfaces';
import { ExpParser } from '../utils/expParser';
import { Utils } from './utils';


/**
 * Get string after a substring
 * @param str string
 * @param substr string
 */
export function strAfter(str: string, substr: string) {
  return str.split(substr)[1];
}

/**
 * Get string before a substring
 * @param str string
 * @param substr string
 */
export function strBefore(str: string, substr: string) {
  return str.split(substr)[0];
}

export function isArrayAndHasLength(arr: any) {
  return arr && Array.isArray(arr) && arr.length;
}

export class Helpers {
  static isUuid(str: string): boolean {
    return RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).test(str);
  }

  static slugify(str: string) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    const to = 'aaaaeeeeiiiioooouuuunc------';
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  static uuid(): string {
    return uuidv4();
  }

  static o2s(inputs: Record<string, any>): string {
    return ExpParser.buildFromObj(inputs);
  }

  static throwGenericIf(condition: boolean, msg: string): void {
    if (condition) throw new GenericException(msg);
  }

  static throwNotFoundIf(condition: boolean, msg: string): void {
    if (condition) throw new NotFoundException(msg);
  }

  static throwForbiddenIf(condition: boolean, error: Record<string, any>): void {
    if (condition) throw new ForbiddenException(error);
  }

  static throwIf(condition: boolean, ex: Error): void {
    if (condition) throw ex;
  }

  static throwValidationIf(condition: boolean, msg: Record<string, any>): void {
    if (condition) throw new ValidationFailed(msg);
  }

  static isLocal(): boolean {
    return process.env.APP_STAGE === 'local';
  }

  static isObject(value: any): boolean {
    if (typeof value === 'object' && value !== null) {
      return true;
    }
    return false;
  }

  static isEmpty(value): boolean {
    if (Array.isArray(value) && value.length < 1) return true;
    if (this.isObject(value) && Object.keys(value).length < 1) return true;
    if (!value) return true;

    return false;
  }

  static referenceId(length: number): string {
    const char = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return this.randomString(length, char);
  }

  static randomString(length: number, str?: string) {
    let result = '';
    const characters = str ? str : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static timeBasedRefId(options?: TimebasedRefId): string {
    options = options || {};
    const dateObj = new Date();
    const date = dateObj.toISOString().split('T')[0].substr(2).replace(/-/g, '');
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const timestamp = `${date}${hours}${minutes}`;
    const str = Utils.randomString(options?.len || 8).toUpperCase();
    const prefix = options.prefix || '';
    return `${prefix.trim()}${timestamp}${str}`;
  }

  static getFormattedEager(include = '', eagerDependencyMapping: Record<string, any>): Record<string, any> {
    const commonEager = {};
    Object.keys(eagerDependencyMapping).filter((val) => {
      const arr: string[] = include.split(',');
      const isMatched = arr.includes(val);
      if (isMatched) {
        commonEager[val] = true;
      }
      return isMatched;
    });

    return commonEager;
  }

  static getSanitizeKeywordStringForES(str: string) {
    // The reserved characters are: + - = && || > < ! ( ) { } [ ] ^ " ~ * ? : \ /
    return str
      .replace('|', '')
      .replace('+', '')
      .replace('-', '')
      .replace('=', '')
      .replace('&', '')
      .replace('>', '')
      .replace('<', '')
      .replace('!', '')
      .replace('(', '')
      .replace(')', '')
      .replace('{', '')
      .replace('}', '')
      .replace('^', '')
      .replace('"', '')
      .replace('*', '')
      .replace('?', '')
      .replace(':', '')
      .replace('/', '')
      .replace(']', '')
      .replace('[', '')
      .replace('~', '')
      .replace('\\', '');
  }

  static csv2json<T>(data: string): T[] {
    // options = options || {};
    return [];
  }

  static groupCSVFieldsToArray = (inputObj, splitBy = 'configuration') => {
    const ToSkipConfiguration = ['FolderLink'];
    const dataMap = {};

    for (let key in inputObj) {
      let splitKeyArr = key.split(splitBy);

      if (splitKeyArr.length !== 2) continue;

      let splitKey = splitKeyArr[1];

      if (ToSkipConfiguration.includes(splitKey)) continue;

      let configNo = splitKey.replace(/[^0-9]/g, '');

      let objKey = splitKey.split(configNo)[1]; //type
      objKey = objKey.toLowerCase();

      if (dataMap.hasOwnProperty(configNo)) {
        dataMap[configNo][objKey] = inputObj[key]; // {1:{type:2, nae:4}}
      } else {
        dataMap[configNo] = {
          [objKey]: inputObj[key],
          id: configNo,
        };
      }
    }

    const finalConfigArray = [];
    for (let key in dataMap) {
      finalConfigArray.push(dataMap[key]);
    }
    return finalConfigArray;
  };

  static getKeyByValue(val, obj) {
    console.log('getKeyByValue', val);
    console.log('getKeyByValue', obj);
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === val) {
        return key;
      }
    }
  }
}
