import { Body, Controller, Delete, Get, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { CreateBlockDto } from './dto/block.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { group } from 'console';

@Controller('blocks')
export class BlocksController {
    constructor(private blockService: BlocksService) {}

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create( @Body() dto: CreateBlockDto,
                @UploadedFile() image) {
        return this.blockService.createBlock(dto, image);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put()
    @UseInterceptors(FileInterceptor('image'))
    update( @Body() dto: CreateBlockDto,
                @UploadedFile() image = '',
                @Query('uniqueName') uniqueName: string) {
        return this.blockService.updateBlock(dto, image, uniqueName);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete()
    @UseInterceptors(FileInterceptor('image'))
    delete( @Body() dto: CreateBlockDto,
                @UploadedFile() image = '',
                @Query('uniqueName') uniqueName: string) {
        return this.blockService.deleteBlock(uniqueName);
    }

    @Get()
    getAll() {
        return this.blockService.getAllBlocks();
    }  

    @Get('/group')
    getGroup(@Query('groupName') group: string) {
        return this.blockService.getGroup(group);
    }  
    
    
}
