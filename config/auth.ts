import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.JWT_SECRET || 'DummySecret',
  signOptions: { expiresIn: process.env.JWT_EXPIRY || '12h' },
}));
