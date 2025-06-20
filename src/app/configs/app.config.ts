import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  database: {
    type: process.env.DATABASE_TYPE as 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
  },
  throttle: {
    ttl: Number(process.env.THROTTLE_TTL) || 60000,
    limit: Number(process.env.THROTTLE_LIMIT) || 60,
    blockDuration: Number(process.env.THROTTLE_BLOCK_DURATION) || 5000,
  },
  google: {
    apiKey: process.env.GOOGLE_API_KEY,
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    fromNumber: process.env.TWILIO_FROM_NUMBER,
  },
}));
