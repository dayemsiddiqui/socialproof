import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(config.BASE_URL);
  await app.listen(3000);
}
bootstrap();
