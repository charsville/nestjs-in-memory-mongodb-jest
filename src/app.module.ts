import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV ?? 'development'}.env`,
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return <MongooseModuleOptions>{
          uri: config.get<string>('DB_CONNECTION_STRING'),
        };
      },
      inject: [ConfigService],
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
