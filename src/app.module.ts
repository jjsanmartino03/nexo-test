import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PeopleModule} from './people/people.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AddressModule} from './address/address.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
