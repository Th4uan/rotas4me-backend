import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorExceptionFilter } from './common/filters/error-exception.filter';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new ErrorExceptionFilter());

  app.use(helmet());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Saas API')
    .setDescription('Saas API endpoints')
    .setVersion('1.0')
    .addTag('saas')
    .addCookieAuth('jwt')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    process.env.SWAGGER_URL ?? '/api-docs',
    app,
    documentFactory,
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
