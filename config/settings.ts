import { registerAs } from '@nestjs/config';

// all your application settings go here.
export default registerAs('settings', () => ({
  user: {
    role: {
      candidate: 1,
      recruiter: 2,
      admin: 3,
    },
  },
  role: {
    admin: 3,
    user: [1, 2],
  },
  otpTimeout: 600,
  status: {
    active: 1,
    inactive: 0,
  },
}));
