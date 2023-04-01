import { Block } from './block.model';
import { FilesService } from 'src/files/files.service';
import { CreateBlockDto } from './dto/block.dto';
export declare class BlocksService {
    private blockRepository;
    private fileService;
    constructor(blockRepository: typeof Block, fileService: FilesService);
    createBlock(dto: CreateBlockDto, image: any): Promise<Block>;
    getAllBlocks(): Promise<Block[]>;
    updateBlock(dto: CreateBlockDto, image: any, name: string): Promise<Block>;
    deleteBlock(name: string): Promise<Block>;
    getGroup(groupName: string): Promise<Block[]>;
}
