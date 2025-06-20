import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './configs/app.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { MarkerModule } from 'src/marker/marker.module';
import { MapsModule } from 'src/maps/maps.module';
import { SmsModule } from '../sms/sms.module';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      inject: [appConfig.KEY],
      useFactory: (config: ConfigType<typeof appConfig>) => {
        return [
          {
            ttl: config.throttle.ttl,
            limit: config.throttle.limit,
            blockDuration: config.throttle.blockDuration,
          },
        ];
      },
    }),
    ConfigModule.forRoot({
      envFilePath: 'env/.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      inject: [appConfig.KEY],
      useFactory: (config: ConfigType<typeof appConfig>) => {
        return {
          type: config.database.type,
          host: config.database.host,
          port: config.database.port,
          username: config.database.username,
          password: config.database.password,
          database: config.database.database,
          autoLoadEntities: config.database.autoLoadEntities,
          synchronize: false,
          timezone: 'America/Sao_Paulo',
        };
      },
    }),
    UserModule,
    MarkerModule,
    MapsModule,
    SmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
