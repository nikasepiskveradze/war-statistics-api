import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync(
    '/etc/letsencrypt/live/war-track.com/privkey.pem',
    'utf8',
  ),
  cert: fs.readFileSync(
    '/etc/letsencrypt/live/war-track.com/fullchain.pem',
    'utf8',
  ),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions });

  const config = new DocumentBuilder()
    .setTitle('War Track API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
