import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiExcludeEndpoint()
  @Get()
  redirectToSwagger(@Res() response: Response) {
    response.setHeader('Location', '/swagger');
    response.status(302).send();
    return;
  }
}
