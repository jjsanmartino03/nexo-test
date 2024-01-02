import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
  imports: [ConfigService],
})
export class PhotosModule {}
