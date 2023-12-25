import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TestModule } from "./test/test.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { TodoModule } from "./todo/todo.module";
import { FirstMiddleware } from "./middlewares/first/first.middleware";
import { LoggerMiddleware } from "./middlewares/Logger.middleware";
import { HelmetMiddleware } from "@nest-middlewares/helmet";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonModule } from "./person/person.module";
import * as dotEnv from "dotenv";

const typeOrmConnectionDataSource = {
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "nest",
  entities: [],
  synchronize: true,
};
dotEnv.config();

@Module({
  imports: [
    TestModule,
    UserModule,
    AuthModule,
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "db",
      port: 3306,
      username: "root",
      password: "root",
      database: "nest",
      entities: ["dist/**/*.entity.js"],
      synchronize: true,
      autoLoadEntities: true,
    }),
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(FirstMiddleware)
      .forRoutes(
        { path: "todo", method: RequestMethod.GET },
        { path: "todo*", method: RequestMethod.DELETE },
      )
      .apply(LoggerMiddleware)
      .forRoutes("")
      .apply(HelmetMiddleware)
      .forRoutes("");
  }
}
