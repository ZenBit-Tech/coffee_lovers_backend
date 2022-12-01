"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
var serve_static_1 = require("@nestjs/serve-static");
var Test_entity_1 = require("@entities/Test.entity");
var User_entity_1 = require("@entities/User.entity");
var WorkHistory_entity_1 = require("@entities/WorkHistory.entity");
var Education_entity_1 = require("@entities/Education.entity");
var Category_entity_1 = require("@entities/Category.entity");
var Job_entity_1 = require("@entities/Job.entity");
var Skill_entity_1 = require("@entities/Skill.entity");
var Proposal_entity_1 = require("@entities/Proposal.entity");
var app_controller_1 = require("@/app.controller");
var app_service_1 = require("@/app.service");
var auth_module_1 = require("@/modules/auth/auth.module");
var test_module_1 = require("@/modules/test/test.module");
var user_module_1 = require("@/modules/user/user.module");
var constants_1 = require("@/modules/file/constants");
var properties_module_1 = require("@/modules/properties/properties.module");
var job_module_1 = require("./modules/jobs/job.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    envFilePath: ".".concat(process.env.NODE_ENV, ".env"),
                    isGlobal: true
                }),
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: process.env.DB_HOST,
                    port: +process.env.DB_PORT,
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    entities: [
                        Test_entity_1.Test,
                        User_entity_1.User,
                        WorkHistory_entity_1.WorkHistory,
                        Education_entity_1.Education,
                        Category_entity_1.Category,
                        Job_entity_1.Job,
                        Skill_entity_1.Skill,
                        Proposal_entity_1.Proposal,
                    ],
                    synchronize: true
                }),
                serve_static_1.ServeStaticModule.forRoot({
                    rootPath: constants_1.filePath
                }),
                auth_module_1.AuthModule,
                test_module_1.TestModule,
                user_module_1.UserModule,
                job_module_1.JobsModule,
                properties_module_1.PropertiesModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
