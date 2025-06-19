import { Controller } from '@nestjs/common';
import { MarkerService } from './marker.service';

@Controller('marker')
export class MarkerController {
  constructor(private readonly markerService: MarkerService) {}
}
