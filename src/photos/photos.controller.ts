import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PhotosService } from './photos.service';

@Controller('fotos')
@ApiTags('Fotos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}
  @Post('/')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        foto: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['foto'],
    },
  })
  @ApiOperation({ summary: 'Cargar una foto y obtener la URL' })
  @UseInterceptors(FileInterceptor('foto'))
  async uploadPhoto(@UploadedFile() photo: Express.Multer.File) {
    return this.photosService.uploadPhoto(photo);
  }
}
