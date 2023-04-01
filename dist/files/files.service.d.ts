import { CreateFileDto } from './dto/create-files.dto';
import { File } from './files.model';
export declare class FilesService {
    private fRepository;
    constructor(fRepository: typeof File);
    createFileLocal(file: any, fileName: string): Promise<string>;
    createFileDB(dto: CreateFileDto): Promise<File>;
    refresh(): Promise<{
        deletedCount: number;
    }>;
    getByTableAndId(table: string, id: number): Promise<File>;
}
