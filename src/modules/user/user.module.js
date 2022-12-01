"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var User_entity_1 = require("@/common/entities/User.entity");
var WorkHistory_entity_1 = require("@/common/entities/WorkHistory.entity");
var Education_entity_1 = require("@/common/entities/Education.entity");
var user_service_1 = require("@/modules/user/user.service");
var user_controller_1 = require("@/modules/user/user.controller");
var mail_module_1 = require("@/modules/mail/mail.module");
var file_module_1 = require("@/modules/file/file.module");
var Job_entity_1 = require("@/common/entities/Job.entity");
var Category_entity_1 = require("@/common/entities/Category.entity");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([User_entity_1.User, WorkHistory_entity_1.WorkHistory, Education_entity_1.Education, Job_entity_1.Job, Category_entity_1.Category]),
                mail_module_1.MailModule,
                file_module_1.FileModule,
            ],
            controllers: [user_controller_1.UserController],
            providers: [user_service_1.UserService],
            exports: [user_service_1.UserService]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
