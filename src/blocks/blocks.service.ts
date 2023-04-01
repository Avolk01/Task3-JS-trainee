import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Block } from './block.model';
import { FilesService } from 'src/files/files.service';
import { CreateBlockDto } from './dto/block.dto';

@Injectable()
export class BlocksService {
    constructor(@InjectModel(Block) private blockRepository: typeof Block,
                private fileService: FilesService) {}


    async createBlock(dto: CreateBlockDto, image: any) {
        const fileName = await this.fileService.createFileLocal(image, dto.uniqueName);
        const block = await this.blockRepository.create({ ...dto, image: fileName });
        console.log(fileName);
        const fileBd = await this.fileService.createFileDB({
            fileName: fileName,
            createdAt: Date.now().toString(),
            essenceTable: 'block',
            essenceId: block.id,
            file: image
        });
        return block;
    }

    async getAllBlocks() {
        const blocks = await this.blockRepository.findAll();
        return blocks;
    }

    async updateBlock(dto: CreateBlockDto, image: any, name: string) {
        const block = await this.blockRepository.findOne({where: {uniqueName: name}})
        let fname = dto.uniqueName + '.jpg';
        if (image != '') {            
            fname = await this.fileService.createFileLocal(image, fname);
        }            
        await block.update(dto);
        block.image = fname;
        return block;
    }

    async deleteBlock(name: string) {
        const block = await this.blockRepository.findOne({where: {uniqueName: name}});        
        const file = await this.fileService.getByTableAndId('block', block.id);
        await block.destroy();
        await file.update({essenceId: 0});
        return block;
    }

    async getGroup(groupName: string) {
        const blocks = await this.blockRepository.findAll({where: {group: groupName}});
        return blocks;
    } 

}
