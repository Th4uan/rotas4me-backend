import { Module } from '@nestjs/common';
import { MarkerService } from './marker.service';
import { MarkerController } from './marker.controller';

@Module({
  controllers: [MarkerController],
  providers: [MarkerService],
})
export class MarkerModule {}
