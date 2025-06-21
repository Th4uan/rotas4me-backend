import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { MarkerService } from './marker.service';
import {
  CreateMarkerDto,
  UpdateMarkerDto,
  MarkerResponseDto,
  GetMarkersByTypeDto,
  GetNearbyMarkersDto,
} from './dto';

@ApiTags('Markers')
@Controller('marker')
export class MarkerController {
  constructor(private readonly markerService: MarkerService) {}

  @Get()
  @ApiOperation({ summary: 'Buscar todos os marcadores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de marcadores retornada com sucesso',
    type: [MarkerResponseDto],
  })
  async findAll(): Promise<MarkerResponseDto[]> {
    return await this.markerService.findAll();
  }

  @Get('by-type')
  @ApiOperation({ summary: 'Buscar marcadores por tipo' })
  @ApiResponse({
    status: 200,
    description: 'Marcadores filtrados por tipo retornados com sucesso',
    type: [MarkerResponseDto],
  })
  async findByTypes(
    @Query(ValidationPipe) query: GetMarkersByTypeDto,
  ): Promise<MarkerResponseDto[]> {
    return await this.markerService.findByTypes(query.types);
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Buscar marcadores próximos' })
  @ApiResponse({
    status: 200,
    description: 'Marcadores próximos retornados com sucesso',
    type: [MarkerResponseDto],
  })
  async findNearby(
    @Query(ValidationPipe) query: GetNearbyMarkersDto,
  ): Promise<MarkerResponseDto[]> {
    return await this.markerService.findNearby(
      query.lat,
      query.lng,
      query.radius || 1000,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar marcador por ID' })
  @ApiParam({ name: 'id', description: 'ID do marcador' })
  @ApiResponse({
    status: 200,
    description: 'Marcador encontrado com sucesso',
    type: MarkerResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Marcador não encontrado' })
  async findById(@Param('id') id: string): Promise<MarkerResponseDto | null> {
    return await this.markerService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo marcador' })
  @ApiResponse({
    status: 201,
    description: 'Marcador criado com sucesso',
    type: MarkerResponseDto,
  })
  async create(
    @Body() createMarkerDto: CreateMarkerDto,
  ): Promise<MarkerResponseDto> {
    return await this.markerService.create(createMarkerDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar marcador' })
  @ApiParam({ name: 'id', description: 'ID do marcador' })
  @ApiResponse({
    status: 200,
    description: 'Marcador atualizado com sucesso',
    type: MarkerResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Marcador não encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateMarkerDto: UpdateMarkerDto,
  ): Promise<MarkerResponseDto | null> {
    return await this.markerService.update(id, updateMarkerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar marcador' })
  @ApiParam({ name: 'id', description: 'ID do marcador' })
  @ApiResponse({ status: 200, description: 'Marcador deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Marcador não encontrado' })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.markerService.delete(id);
  }
}
