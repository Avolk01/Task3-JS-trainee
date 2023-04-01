import { Module, forwardRef } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Block } from './block.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [BlocksService],
  controllers: [BlocksController],
  imports: [
    SequelizeModule.forFeature([Block]), 
    FilesModule,
    forwardRef(()=>AuthModule),
  ],
  exports: [],
})
export class BlockModule {}
