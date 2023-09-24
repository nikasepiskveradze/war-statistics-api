import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import httpsOptions from './utils/httpsOptions';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import * as https from 'https';
import { ShutdownObserver } from './utils/shutdown-observer';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const config = new DocumentBuilder()
    .setTitle('War Track API')
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
      .createServer(httpsOptions, server)
      .listen(process.env.APP_HTTPS_PORT);

    const shutdownObserver = app.get(ShutdownObserver);
    shutdownObserver.addHttpServer(httpServer);
    shutdownObserver.addHttpServer(httpsServer);
  } else {
    await app.listen(process.env.APP_HTTP_PORT);
  }
}
bootstrap();
