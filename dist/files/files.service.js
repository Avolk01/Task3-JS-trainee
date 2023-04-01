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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const fs = require("fs");
const path = require("path");
const files_model_1 = require("./files.model");
let FilesService = class FilesService {
    constructor(fRepository) {
        this.fRepository = fRepository;
    }
    async createFileLocal(file, fileName) {
        try {
            const fname = fileName + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static');
            if (!fs.existsSync(filePath))
                fs.mkdirSync(filePath, { recursive: true });
            fs.writeFileSync(path.join(filePath, fname), file.buffer);
            return fname;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createFileDB(dto) {
        const file = await this.fRepository.create(dto);
        return file;
    }
    async refresh() {
        let count = 0;
        const time = Date.now();
        const files = await this.fRepository.findAll();
        files.forEach(async (file) => {
            const createdTime = Date.parse(file.createdAt);
            const diff = time - createdTime;
            if (diff >= 1000 * 60 * 60 || file.essenceTable == null || file.essenceId == null || file.essenceTable == '' || file.essenceId == 0) {
                count += 1;
                await file.destroy();
            }
        });
        return { deletedCount: count };
    }
    async getByTableAndId(table, id) {
        const file = await this.fRepository.findOne({ where: { essenceTable: table, essenceId: id } });
        return file;
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(files_model_1.File)),
    __metadata("design:paramtypes", [Object])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map