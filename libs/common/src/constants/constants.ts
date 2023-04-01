export const STATUS = {
  active: 1,
  inactive: 0,
};

export const ERROR = {
  INVALID_CREDENTIALS: 'Invalid Credentials',
  UNAUTHORIZED: 'Unauthorized',
  CANNOT_RESET:
    'Password for this account cannot be reset, please contact admin',
  INVALID_REGISTER: 'Invalid Register Request',
  INVALID_PHONE_NUMBER: 'Invalid Phone Number',
  ALREADY_APPLIED: 'Already Applied to this job',
  INVALID_STATUS_UPDATE: 'Status Value Invalid',
  OTP_INCORRECT: 'Incorrect Otp',
  OTP_NOT_FOUND: 'Otp Expired',
  INVALID_STATUS: 'Invalid status field',
  INVALID_EXPRESSION: 'Invalid Expression',
  DELETED_USER: 'User Deleted, Please contact admin',
  JOB_NOT_FOUND: 'Invalid Job Id'
};

export const SUCCESS = {
  OTP_SENT: 'Otp Sent Successfully',
  RESET_PASSWORD: 'Reset Password Successfully',
  JOB_CREATE_SUCCESS: 'Job Posted Successfully',
  JOB_UPDATE_SUCCES: 'Job Updated Successfully',
  JOB_APPLY_SUCCESS: 'Apply success',
  JOB_INACTIVATED: 'Job and associated applications are inactivated',
  USER_INACTIVATED: 'User has been deleted',
};

export const JOB = {
  SEND_MAIL_TO_CANDIDATE: 'SEND_MAIL_TO_CANDIDATE',
  SEND_MAIL_TO_RECRUITER: 'SEND_MAIL_TO_RECRUITER',
  SEND_OTP_MAIL_TO_USER: 'SEND_OTP_MAIL_TO_USER',
  SEND_RESET_MAIL_TO_USER: 'SEND_RESET_MAIL_TO_USER',
  SEND_DELETE_MAIL_TO_USER: 'SEND_DELETE_MAIL_TO_USER',
  SEND_REGISTER_MAIL_TO_USER: 'SEND_REGISTER_MAIL_TO_USER',
  USER_DELETED: 'DELETE_USER_AND_ASSOCIATES',
  JOB_DELETED: 'DELETE_JOB_AND_ASSOCIATES',
};

export const ROLE = {
  candidate: 1,
  recruiter: 2,
  admin: 3,
};
