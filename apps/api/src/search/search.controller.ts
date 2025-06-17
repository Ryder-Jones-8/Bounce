import { Body, Controller, Post } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto, searchDto } from './dto';

@Controller('search')
export class SearchController {
  constructor(private readonly service: SearchService) {}

  @Post()
  async search(@Body() body: SearchDto) {
    searchDto.parse(body);
    return this.service.search(body);
  }
}
