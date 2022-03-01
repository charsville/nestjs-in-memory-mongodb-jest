import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatDto } from './cat.dto';
import { CatMapper } from './cat.mapper';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  public async GetAllCats(): Promise<Array<CatDto>> {
    return (await this.catsService.findAll()).map(CatMapper);
  }

  @Post()
  public async CreateCat(@Body() newCat: CatDto): Promise<CatDto> {
    return CatMapper(await this.catsService.create(newCat));
  }
}
