import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-files.dto';
export declare class FilesController {
    private fileService;
    constructor(fileService: FilesService);
    create(dto: CreateFileDto, image: any): Promise<import("./files.model").File>;
    refresh(): Promise<{
        deletedCount: number;
    }>;
}
