import { BlocksService } from './blocks.service';
import { CreateBlockDto } from './dto/block.dto';
export declare class BlocksController {
    private blockService;
    constructor(blockService: BlocksService);
    create(dto: CreateBlockDto, image: any): Promise<import("./block.model").Block>;
    update(dto: CreateBlockDto, image: string, uniqueName: string): Promise<import("./block.model").Block>;
    delete(dto: CreateBlockDto, image: string, uniqueName: string): Promise<import("./block.model").Block>;
    getAll(): Promise<import("./block.model").Block[]>;
    getGroup(group: string): Promise<import("./block.model").Block[]>;
}
