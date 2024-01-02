import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      skipMissingProperties: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Nexo Test')
    .setVersion('1.0')
    .setDescription(
      `Este proyecto es un test técnico para la empresa Nexo Soluciones. Consiste
en una API REST que permite realizar operaciones CRUD sobre una base de datos
de personas.

A través de esta API se pueden crear, leer, actualizar y eliminar **personas**,
así como crear, modificar y obtener sus **direcciones**.

**Aclaraciones:**
- La API no permite eliminar todas las direcciones de una persona, ni crear una persona sin dirección, ya que el requerimiento establece que una persona debe tener al menos una dirección.
- Para subir una foto, se debe primero utilizar el endpoint para cargar la foto y obtener la url, y luego utilizar esa url para crear o actualizar una persona.`,
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  if (process.env.NODE_ENV === 'development') {
    fs.writeFileSync('./swagger.json', JSON.stringify(document));
  }

  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
