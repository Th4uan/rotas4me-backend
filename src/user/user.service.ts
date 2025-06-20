import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto';
import { UserMapper } from './mappers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    return UserMapper.toResponseDto(savedUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return UserMapper.toResponseDtoArray(users);
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return UserMapper.toResponseDto(user);
  }

  async findByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ? UserMapper.toResponseDto(user) : null;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);
    return UserMapper.toResponseDto(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    await this.userRepository.remove(user);
  }

  async findUsersNearby(
    lat: number,
    lng: number,
    radiusKm: number = 10,
  ): Promise<
    Omit<UserResponseDto, 'email' | 'telefone' | 'contatosEmergencia'>[]
  > {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.lat IS NOT NULL AND user.lng IS NOT NULL')
      .andWhere('user.compartilharLocalizacao = :compartilhar', {
        compartilhar: true,
      })
      .getMany();

    const nearbyUsers = users.filter((user) => {
      if (!user.lat || !user.lng) return false;
      const distance = this.calculateDistance(lat, lng, user.lat, user.lng);
      return distance <= radiusKm;
    });

    return UserMapper.toPublicResponseDtoArray(nearbyUsers);
  }

  private calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLng = this.deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
