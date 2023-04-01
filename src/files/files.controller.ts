import { Body, Controller, Delete, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-files.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
    constructor(private fileService: FilesService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    create(
            @Body() dto: CreateFileDto, 
            @UploadedFile() image
        ) {
        console.log(dto);
        this.fileService.createFileLocal(image, dto.fileName);
        return this.fileService.createFileDB(dto);
    }

    @Delete('/refresh')
    refresh() {
        return this.fileService.refresh();
    }


}
 