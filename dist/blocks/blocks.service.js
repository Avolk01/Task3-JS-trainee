"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlocksService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const block_model_1 = require("./block.model");
const files_service_1 = require("../files/files.service");
let BlocksService = class BlocksService {
    constructor(blockRepository, fileService) {
        this.blockRepository = blockRepository;
        this.fileService = fileService;
    }
    async createBlock(dto, image) {
        const fileName = await this.fileService.createFileLocal(image, dto.uniqueName);
        const block = await this.blockRepository.create(Object.assign(Object.assign({}, dto), { image: fileName }));
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
    async updateBlock(dto, image, name) {
        const block = await this.blockRepository.findOne({ where: { uniqueName: name } });
        let fname = dto.uniqueName + '.jpg';
        if (image != '') {
            fname = await this.fileService.createFileLocal(image, fname);
        }
        await block.update(dto);
        block.image = fname;
        return block;
    }
    async deleteBlock(name) {
        const block = await this.blockRepository.findOne({ where: { uniqueName: name } });
        const file = await this.fileService.getByTableAndId('block', block.id);
        await block.destroy();
        await file.update({ essenceId: 0 });
        return block;
    }
    async getGroup(groupName) {
        const blocks = await this.blockRepository.findAll({ where: { group: groupName } });
        return blocks;
    }
};
BlocksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(block_model_1.Block)),
    __metadata("design:paramtypes", [Object, files_service_1.FilesService])
], BlocksService);
exports.BlocksService = BlocksService;
//# sourceMappingURL=blocks.service.js.map