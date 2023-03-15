import { registerAs } from '@nestjs/config';

export default registerAs('error', () => ({
  otpSent: 'Otp sent Successfully',
  resetSuccess: 'Password Reset Successfully',
}));
