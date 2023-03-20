import { registerAs } from '@nestjs/config';

// all your application settings go here.
export default registerAs('settings', () => ({
  role: {
    admin: 3,
    user: [1, 2],
  },
  otpTimeout: 600,
  status: {
    active: 1,
    inActive: 0,
  },
}));
