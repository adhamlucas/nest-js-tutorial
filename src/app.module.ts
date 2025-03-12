import {
  MiddlewareConsumer,
  Module,
  NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsModule } from './songs/songs.module';
import { DevConfigService } from './common/providers/DevConfigService';
// import { SongsController } from './songs/songs.controller';
import { DatabaseModule } from './database/database.module';

const devConfig = { port: 3000 };
const proConfig = { port: 400 };

@Module({
  imports: [SongsModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs'); // option number 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); // option number 2
    // consumer.apply(LoggerMiddleware).forRoutes(SongsController); // option number 3
  }
}
