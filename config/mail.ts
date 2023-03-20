import { registerAs } from '@nestjs/config';
import { MailmanOptions } from '@squareboat/nest-mailman';
import { GenericMail } from 'resources/views/mail';

export default registerAs(
  'mailman',
  () =>
    ({
      host: process.env.MAIL_HOST,
      port: +process.env.MAIL_PORT,
      username: process.env.MAIL_USERNAME,
      password: process.env.MAIL_PASSWORD,
      from: process.env.MAIL_SENDER_ID,
      templateConfig: {
        baseComponent: GenericMail,
        templateOptions: {
          socialMedia: [
            {
              name: 'youtube-noshare',
              href: 'https://www.youtube.com/channel/UCyUzPvikgKBYTfp4XBIbbOg',
            },
            {
              name: 'instagram-noshare',
              href: 'https://www.instagram.com/square.boat/',
            },
            {
              name: 'linkedin-noshare',
              href: 'https://www.linkedin.com/company/squareboat',
            },
            {
              name: 'github-noshare',
              href: 'https://github.com/squareboat',
            },
          ],
          appLogoSrc:
            'https://i.ibb.co/7VrFQwN/squareboat-logo-transparent.png',
          appName: 'Squareboat',
          contactEmail: 'hi@squareboat.com',
        },
      },
    } as MailmanOptions),
);
