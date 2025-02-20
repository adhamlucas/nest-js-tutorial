import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { conncetion } from 'src/common/constants/connection';

// const mockSongsService = {
//   findAll() {
//     return [{ id: 1, title: 'Lasting Forever', artists: ['Siagla', 'Bruno'] }];
//   },
// };

@Module({
  controllers: [SongsController],
  // providers: [SongsService],
  providers: [
    SongsService,
    {
      // provide: SongsService,
      // useClass: SongsService,
      // useValue: mockSongsService,
      provide: 'CONNECTION',
      useValue: conncetion,
    },
  ],
})
export class SongsModule {}
