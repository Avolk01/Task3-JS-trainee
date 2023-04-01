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
exports.BlocksController = void 0;
const common_1 = require("@nestjs/common");
const blocks_service_1 = require("./blocks.service");
const block_dto_1 = require("./dto/block.dto");
const platform_express_1 = require("@nestjs/platform-express");
const roles_auth_decorator_1 = require("../auth/roles-auth.decorator");
const roles_guard_1 = require("../auth/roles.guard");
let BlocksController = class BlocksController {
    constructor(blockService) {
        this.blockService = blockService;
    }
    create(dto, image) {
        return this.blockService.createBlock(dto, image);
    }
    update(dto, image = '', uniqueName) {
        return this.blockService.updateBlock(dto, image, uniqueName);
    }
    delete(dto, image = '', uniqueName) {
        return this.blockService.deleteBlock(uniqueName);
    }
    getAll() {
        return this.blockService.getAllBlocks();
    }
    getGroup(group) {
        return this.blockService.getGroup(group);
    }
};
__decorate([
    (0, roles_auth_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [block_dto_1.CreateBlockDto, Object]),
    __metadata("design:returntype", void 0)
], BlocksController.prototype, "create", null);
__decorate([
    (0, roles_auth_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Put)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Query)('uniqueName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [block_dto_1.CreateBlockDto, Object, String]),
    __metadata("design:returntype", void 0)
], BlocksController.prototype, "update", null);
__decorate([
    (0, roles_auth_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Delete)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Query)('uniqueName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [block_dto_1.CreateBlockDto, Object, String]),
    __metadata("design:returntype", void 0)
], BlocksController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlocksController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/group'),
    __param(0, (0, common_1.Query)('groupName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlocksController.prototype, "getGroup", null);
BlocksController = __decorate([
    (0, common_1.Controller)('blocks'),
    __metadata("design:paramtypes", [blocks_service_1.BlocksService])
], BlocksController);
exports.BlocksController = BlocksController;
//# sourceMappingURL=blocks.controller.js.map