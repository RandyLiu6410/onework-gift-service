import { NestFactory } from '@nestjs/core';
import { NotifierAdapter } from 'modules/notifier/notifier.adapter';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.useWebSocketAdapter(new NotifierAdapter(app));

  await app.listen(process.env.PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
