import { registerAs } from '@nestjs/config';

export default registerAs('error', () => ({
  notAdmin: process.env.NOT_ADMIN_ERR || 'Admin Not Found',
  notUser: process.env.NOT_USER_ERR || 'User Not Found',
  resetNotFound: process.env.RESET_NOT_FOUND_ERR || 'Invalid Reset Request',
  incorrectOtp: process.env.OTP_INCORRECT_ERR || 'Incorrect Otp',
}));
