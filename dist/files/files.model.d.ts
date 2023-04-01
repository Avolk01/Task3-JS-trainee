import { Model } from "sequelize-typescript";
interface FileCreationAttrs {
    fileName: string;
    createdAt: string;
    essenceTable: string;
    essenceId: number;
}
export declare class File extends Model<File, FileCreationAttrs> {
    id: number;
    fileName: string;
    createdAt: string;
    essenceTable: string;
    essenceId: number;
}
export {};
