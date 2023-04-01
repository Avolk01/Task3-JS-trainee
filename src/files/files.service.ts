import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { CreateFileDto } from './dto/create-files.dto';
import { File } from './files.model';
import { where } from 'sequelize';

@Injectable()
export class FilesService {

    constructor(@InjectModel(File) private fRepository: typeof File){ }

    async createFileLocal(file, fileName: string): Promise<string>{
        try {
            const fname = fileName + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static');
            if (!fs.existsSync(filePath))
                fs.mkdirSync(filePath, {recursive: true});
            fs.writeFileSync(path.join(filePath, fname), file.buffer);
            return fname
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createFileDB(dto: CreateFileDto) {
        const file = await this.fRepository.create(dto);
        return file;
    }

    async refresh() {
        let count = 0;
        const time = Date.now();
        const files = await this.fRepository.findAll();
        files.forEach(async file => {
            const createdTime = Date.parse(file.createdAt);
            const diff = time - createdTime;
            if (diff >= 1000*60*60 || file.essenceTable == null || file.essenceId == null || file.essenceTable == '' || file.essenceId == 0){
                count += 1;
                await file.destroy();                
            }
        });
        return {deletedCount: count};
    } 

    async getByTableAndId(table: string, id: number) {
        const file = await this.fRepository.findOne({where: {essenceTable: table, essenceId: id}})
        return file;
    }
}
