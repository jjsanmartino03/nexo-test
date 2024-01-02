import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module';
import { PhotosModule } from './photos/photos.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          url: configService.get<string>('DATABASE_URL'),
          type: 'postgres',
          synchronize: true,
          autoLoadEntities: true,
          entities: ['dist/**/*.entity.js'],
          ssl: {
            rejectUnauthorized: false, // Note: setting this to false can be insecure
          },
        };
      },
      inject: [ConfigService],
    }),
    PeopleModule,
    AddressModule,
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
