import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesController } from './files.controller';
import { File } from './files.model';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController],
  imports: [
    SequelizeModule.forFeature([File]), 
  ]
})
export class FilesModule {}
