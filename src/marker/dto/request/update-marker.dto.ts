import { PartialType } from '@nestjs/swagger';
import { CreateMarkerDto } from './create-marker.dto';

export class UpdateMarkerDto extends PartialType(CreateMarkerDto) {}
