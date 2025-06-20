import { UserEntity } from '../entity/user.entity';
import { UserResponseDto } from '../dto/user-response.dto';

export class UserMapper {
  /**
   * Converte uma entidade UserEntity para UserResponseDto
   */
  static toResponseDto(user: UserEntity): UserResponseDto {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      lat: user.lat,
      lng: user.lng,
      endereco: user.endereco,
      cidade: user.cidade,
      estado: user.estado,
      telefone: user.telefone,
      contatosEmergencia: user.contatosEmergencia,
      notificacoesSeguranca: user.notificacoesSeguranca,
      compartilharLocalizacao: user.compartilharLocalizacao,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Converte um array de entidades UserEntity para array de UserResponseDto
   */
  static toResponseDtoArray(users: UserEntity[]): UserResponseDto[] {
    return users.map((user) => this.toResponseDto(user));
  }

  /**
   * Converte uma entidade para DTO omitindo campos sensíveis (para listagens públicas)
   */
  static toPublicResponseDto(
    user: UserEntity,
  ): Omit<UserResponseDto, 'email' | 'telefone' | 'contatosEmergencia'> {
    return {
      id: user.id,
      nome: user.nome,
      lat: user.lat,
      lng: user.lng,
      endereco: user.endereco,
      cidade: user.cidade,
      estado: user.estado,
      notificacoesSeguranca: user.notificacoesSeguranca,
      compartilharLocalizacao: user.compartilharLocalizacao,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Converte um array de entidades para DTOs públicos
   */
  static toPublicResponseDtoArray(
    users: UserEntity[],
  ): Omit<UserResponseDto, 'email' | 'telefone' | 'contatosEmergencia'>[] {
    return users.map((user) => this.toPublicResponseDto(user));
  }
}
