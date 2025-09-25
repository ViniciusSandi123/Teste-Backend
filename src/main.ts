import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Response } from 'express'; // Import do Express

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.setGlobalPrefix('api');

  app.getHttpAdapter().get('/', (_req, res: Response) => {
    return res.redirect('/api');
  });

  const config = new DocumentBuilder()
    .setTitle('Teste Backend API')
    .setDescription('API do teste técnico')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Api', app, document);

  await app.listen(3000);
}
bootstrap();