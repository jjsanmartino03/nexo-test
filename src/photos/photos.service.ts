import { Injectable } from '@nestjs/common';
import * as Cloudinary from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PhotosService {
  constructor(private readonly configService: ConfigService) {}
  async uploadPhoto(photo: Express.Multer.File) {
    const cloudinary = Cloudinary.v2;

    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });

    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve) => {
        cloudinary.uploader
          .upload_stream((error, uploadResult) => {
            return resolve(uploadResult);
          })
          .end(photo.buffer);
      },
    );

    return {
      url: uploadResult.secure_url,
    };
  }
}
