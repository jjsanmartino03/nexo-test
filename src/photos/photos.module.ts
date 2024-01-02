import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
  imports: [ConfigModule],
})
export class PhotosModule {}
