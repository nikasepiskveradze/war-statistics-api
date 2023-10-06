import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import getHttpsOptions from './utils/httpsOptions';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import * as https from 'https';
import { ShutdownObserver } from './utils/shutdown-observer';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('War Track API')
    .setDescription(
      'NOTE: Some endpoints does not work in Swagger, due to Swagger limitation. But they are working properly if you pass correct values from your application  ',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (process.env.NODE_ENV === 'production') {
    await app.init();
    const httpServer = http
      .createServer(server)
      .listen(process.env.APP_HTTP_PORT);
    const httpsServer = https
      .createServer(getHttpsOptions(), server)
      .listen(process.env.APP_HTTPS_PORT);

    const shutdownObserver = app.get(ShutdownObserver);
    shutdownObserver.addHttpServer(httpServer);
    shutdownObserver.addHttpServer(httpsServer);
  } else {
    await app.listen(process.env.APP_HTTP_PORT);
  }
}
bootstrap();
