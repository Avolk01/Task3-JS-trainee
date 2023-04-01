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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const profile_model_1 = require("./profile.model");
const sequelize_1 = require("@nestjs/sequelize");
const auth_service_1 = require("../auth/auth.service");
const user_model_1 = require("../users/user.model");
let ProfilesService = class ProfilesService {
    constructor(profileRepository, authService, userRepository) {
        this.profileRepository = profileRepository;
        this.authService = authService;
        this.userRepository = userRepository;
    }
    async createProfile(dto) {
        const profile = await this.profileRepository.create(dto);
        return profile;
    }
    async registration(dto) {
        const reg = await this.authService.registration(dto);
        await this.createProfile({
            userName: dto.userName,
            userSurname: dto.userSurname,
            birthDate: dto.birthDate,
            phoneNumber: dto.phoneNumber,
            userId: reg.userId
        });
        return reg.token;
    }
    async login(dto) {
        const token = await this.authService.login(dto);
        return token;
    }
    async delete(userId) {
        const profile = await this.profileRepository.findOne({ where: { userId: userId } });
        const user = await this.userRepository.findOne({ where: { id: userId } });
        await profile.destroy();
        await user.destroy();
        return user;
    }
    async update(userId, dto) {
        const profile = await this.profileRepository.findOne({ where: { userId: userId } });
        await profile.update(dto);
        return profile;
    }
};
ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(profile_model_1.Profile)),
    __param(2, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, auth_service_1.AuthService, Object])
], ProfilesService);
exports.ProfilesService = ProfilesService;
//# sourceMappingURL=profiles.service.js.map