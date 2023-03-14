import { registerAs } from '@nestjs/config';

export default registerAs('error', () => ({
  NotAdmin: process.env.NOT_ADMIN_ERR || 'Admin Not Found',
  NotUser: process.env.NOT_USER_ERR || 'User Not Found',
  ResetNotFound: process.env.RESET_NOT_FOUND_ERR || 'Invalid Reset Request',
  IncorrectOtp: process.env.OTP_INCORRECT_ERR || 'Incorrect Otp',
}));
