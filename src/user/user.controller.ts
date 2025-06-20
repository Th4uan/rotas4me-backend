import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto';

@ApiTags('Usuários')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    type: [UserResponseDto],
  })
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Buscar usuários próximos' })
  @ApiQuery({
    name: 'lat',
    description: 'Latitude da localização de referência',
    example: -23.5505,
  })
  @ApiQuery({
    name: 'lng',
    description: 'Longitude da localização de referência',
    example: -46.6333,
  })
  @ApiQuery({
    name: 'radius',
    description: 'Raio de busca em quilômetros',
    example: 10,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuários próximos encontrados (dados públicos)',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          nome: { type: 'string' },
          lat: { type: 'number' },
          lng: { type: 'number' },
          endereco: { type: 'string' },
          cidade: { type: 'string' },
          estado: { type: 'string' },
          notificacoesSeguranca: { type: 'boolean' },
          compartilharLocalizacao: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  async findNearby(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius?: number,
  ): Promise<
    Omit<UserResponseDto, 'email' | 'telefone' | 'contatosEmergencia'>[]
  > {
    return this.userService.findUsersNearby(lat, lng, radius);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Buscar usuário por email' })
  @ApiParam({
    name: 'email',
    description: 'Email do usuário',
    example: 'ana.santos@email.com',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findByEmail(
    @Param('email') email: string,
  ): Promise<UserResponseDto | null> {
    return this.userService.findByEmail(email);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID único do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponseDto> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiParam({
    name: 'id',
    description: 'ID único do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover usuário' })
  @ApiParam({
    name: 'id',
    description: 'ID único do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
