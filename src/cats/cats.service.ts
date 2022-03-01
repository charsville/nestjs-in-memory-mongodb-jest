import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './cat.schema';
import { CatDto } from './cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  public async create(createCatDto: CatDto): Promise<CatDocument> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  public async findAll(): Promise<Array<CatDocument>> {
    return this.catModel.find().exec();
  }
}
