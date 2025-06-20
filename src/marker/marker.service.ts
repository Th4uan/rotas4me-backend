import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarkerEntity } from './entity/marker.entity';
import { MarkerType } from './enums/marker.enum';
import { CreateMarkerDto, UpdateMarkerDto, MarkerResponseDto } from './dto';

@Injectable()
export class MarkerService {
  constructor(
    @InjectRepository(MarkerEntity)
    private markerRepository: Repository<MarkerEntity>,
  ) {}

  async findAll(): Promise<MarkerResponseDto[]> {
    return await this.markerRepository.find();
  }

  async findByTypes(types: MarkerType[]): Promise<MarkerResponseDto[]> {
    return await this.markerRepository
      .createQueryBuilder('marker')
      .where('marker.type IN (:...types)', { types })
      .getMany();
  }

  async findNearby(
    lat: number,
    lng: number,
    radius: number,
  ): Promise<MarkerResponseDto[]> {
    return await this.markerRepository
      .createQueryBuilder('marker')
      .where(
        '(6371 * acos(cos(radians(:lat)) * cos(radians(marker.latitude)) * cos(radians(marker.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(marker.latitude)))) <= :radius',
        { lat, lng, radius: radius / 1000 },
      )
      .getMany();
  }

  async create(markerData: CreateMarkerDto): Promise<MarkerResponseDto> {
    const marker = this.markerRepository.create(markerData);
    return await this.markerRepository.save(marker);
  }

  async findById(id: string): Promise<MarkerResponseDto | null> {
    return await this.markerRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    markerData: UpdateMarkerDto,
  ): Promise<MarkerResponseDto | null> {
    await this.markerRepository.update(id, markerData);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.markerRepository.delete(id);
  }
}
