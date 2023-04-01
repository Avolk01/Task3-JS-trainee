"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilesModule = void 0;
const common_1 = require("@nestjs/common");
const profiles_service_1 = require("./profiles.service");
const profiles_controller_1 = require("./profiles.controller");
const auth_module_1 = require("../auth/auth.module");
const sequelize_1 = require("@nestjs/sequelize");
const profile_model_1 = require("./profile.model");
const user_model_1 = require("../users/user.model");
let ProfilesModule = class ProfilesModule {
};
ProfilesModule = __decorate([
    (0, common_1.Module)({
        providers: [profiles_service_1.ProfilesService],
        controllers: [profiles_controller_1.ProfilesController],
        imports: [
            sequelize_1.SequelizeModule.forFeature([profile_model_1.Profile, user_model_1.User]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        exports: [profiles_service_1.ProfilesService],
    })
], ProfilesModule);
exports.ProfilesModule = ProfilesModule;
//# sourceMappingURL=profiles.module.js.map