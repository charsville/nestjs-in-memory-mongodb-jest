import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CatsTestData } from './testData/cats.data';
import { TestDatabaseService } from './utils/testDatabase.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let testDbService: TestDatabaseService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [TestDatabaseService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    testDbService = app.get(TestDatabaseService);
    await testDbService.SeedTestDatabase();
  });

  afterEach(async () => {
    await testDbService.CloseConnection();
  });

  it('GET /', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('GET /cats', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect(CatsTestData);
  });
});
