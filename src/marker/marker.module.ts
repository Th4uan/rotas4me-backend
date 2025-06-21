import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkerService } from './marker.service';
import { MarkerController } from './marker.controller';
import { MarkerEntity } from './entity/marker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarkerEntity])],
  controllers: [MarkerController],
  providers: [MarkerService],
  exports: [MarkerService],
})
export class MarkerModule {}
