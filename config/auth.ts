import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
    secret: 'sadgy',
    signOptions:{expiresIn:'72h'}
}));
