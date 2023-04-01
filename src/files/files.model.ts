import { Column, DataType, Model, Table } from "sequelize-typescript";

interface FileCreationAttrs {
    fileName: string;              
    createdAt: string;            
    essenceTable: string;            
    essenceId: number;                
}

@Table({tableName: 'files'})
export class File extends Model<File, FileCreationAttrs> {
    
    @Column({type: DataType.INTEGER, unique: true, allowNull: false, autoIncrement: true, primaryKey: true})
    id: number;
    
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    fileName: string;

    @Column({type: DataType.STRING, allowNull: false})
    createdAt: string;

    @Column({type: DataType.STRING, allowNull: true})
    essenceTable: string;

    @Column({type: DataType.INTEGER, allowNull: true,})
    essenceId: number;
}