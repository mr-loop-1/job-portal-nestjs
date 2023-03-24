export const STATUS = {
  active: 1,
  inactive: 0,
};

export const ERROR = {
  UNAUTHORIZED: 'Invalid Credentials',
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
};

export const SUCCESS = {
  OTP_SENT: 'Otp Sent Successfully',
  RESET_PASSWORD: 'Reset Password Successfully',
  JOB_CREATE_SUCCESS: 'Job Posted Successfully',
  JOB_UPDATE_SUCCES: 'Job Updated Successfully',
  JOB_APPLY_SUCCESS: 'Apply success',
  CANDIDATE_INACTIVED:
    'Candidate and the associated applications are inactivated',
  RECRUITER_INACTIVED:
    'Recruiter and the associated jobs and their associated applications are inactivated',
  JOB_INACTIVATED: 'Job and associated applications are inactivated',
};

export const JOB = {
  SEND_MAIL_TO_CANDIDATE: 'SEND_MAIL_TO_CANDIDATE',
  SEND_MAIL_TO_RECRUITER: 'SEND_MAIL_TO_RECRUITER',
  SEND_OTP_MAIL_TO_USER: 'SEND_OTP_MAIL_TO_USER',
  SEND_RESET_MAIL_TO_USER: 'SEND_RESET_MAIL_TO_USER',
  SEND_DELETE_MAIL_TO_USER: 'SEND_DELETE_MAIL_TO_USER',
  SEND_REGISTER_MAIL_TO_USER: 'SEND_REGISTER_MAIL_TO_USER',
};

export const ROLE = {
  candidate: 1,
  recruiter: 2,
  admin: 3,
};
