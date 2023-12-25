import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as morgan from "morgan";
import { DurationInterceptor } from "./interceptors/duration/duration.interceptor";
import * as dotenv from'dotenv'
import * as process from "process";

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({ origin: ["http://localhost:4200"] });
  app.use(morgan("dev"));
  app.useGlobalInterceptors(new DurationInterceptor)
  await app.listen(process.env.APP_PORT || 3000);
}

bootstrap();
