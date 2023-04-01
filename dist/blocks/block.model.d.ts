import { Model } from "sequelize-typescript";
interface BlockCreationAttrs {
    uniqueName: string;
    name: string;
    content: string;
    group: string;
    image: string;
}
export declare class Block extends Model<Block, BlockCreationAttrs> {
    id: number;
    uniqueName: string;
    name: string;
    content: string;
    group: string;
    image: string;
}
export {};
