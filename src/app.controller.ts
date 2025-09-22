import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';


@ApiTags('App')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Retorna mensagem de teste' })
  getHello(): string {
    return 'Hello Swagger!';
  }
}
