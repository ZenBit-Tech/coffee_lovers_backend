"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JobsModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
var Proposal_entity_1 = require("@entities/Proposal.entity");
var Job_entity_1 = require("@entities/Job.entity");
var properties_module_1 = require("@/modules/properties/properties.module");
var user_module_1 = require("@/modules/user/user.module");
var job_controller_1 = require("./job.controller");
var job_service_1 = require("./job.service");
var JobsModule = /** @class */ (function () {
    function JobsModule() {
    }
    JobsModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    envFilePath: ".".concat(process.env.NODE_ENV, ".env")
                }),
                typeorm_1.TypeOrmModule.forFeature([Job_entity_1.Job, Proposal_entity_1.Proposal]),
                user_module_1.UserModule,
                properties_module_1.PropertiesModule,
            ],
            controllers: [job_controller_1.JobsController],
            providers: [job_service_1.JobsService]
        })
    ], JobsModule);
    return JobsModule;
}());
exports.JobsModule = JobsModule;
