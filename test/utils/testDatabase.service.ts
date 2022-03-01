import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CatsTestData } from '../testData/cats.data';
import { CatSchema } from '../../src/cats/cat.schema';

@Injectable()
export class TestDatabaseService {
  constructor(@InjectConnection() private connection: Connection) {}

  public async SeedTestDatabase() {
    // Cats Seed
    const catsModel = await this.connection.model('cats', CatSchema);
    await catsModel.deleteMany();
    await catsModel.insertMany(CatsTestData);
  }

  public async CloseConnection() {
    await this.connection.close();
  }
}
