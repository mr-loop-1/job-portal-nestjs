import { ExpParser } from '@libs/boat';

export class CacheKeys {
  static MOBILE_VERIFICATION = 'MOBILE_VERIFICATION';
  static EMAIL_VERIFICATION = 'EMAIL_VERIFICATION';
  static FORGOT_PASSWORD = 'FORGOT_PASSWORD';
  static KYC_VERIFICATION = 'KYC_VERIFICATION';
  static IS_USER_LOGGEDIN = 'IS_USER_LOGGEDIN';
  static NOTIFICATION_PREFERENCE = '';
  static VERIFIED = 'VERIFIED';
  
  static build(key: string, inputs?: Record<string, any>): string {
    const obj = inputs || {};
    obj['keyName'] = key;
    return ExpParser.buildFromObj(obj);
  }
}