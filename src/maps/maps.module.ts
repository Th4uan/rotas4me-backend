import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';
import { MarkerModule } from '../marker/marker.module';
import appConfig from '../app/configs/app.config';

@Module({
  imports: [ConfigModule.forFeature(appConfig), MarkerModule],
  controllers: [MapsController],
  providers: [MapsService],
  exports: [MapsService],
})
export class MapsModule {}
