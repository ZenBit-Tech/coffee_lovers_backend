"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.JobsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var swagger_2 = require("@utils/swagger");
var jwt_auth_guard_1 = require("@/modules/auth/guards/jwt-auth.guard");
var Job_entity_1 = require("@/common/entities/Job.entity");
var JobsController = /** @class */ (function () {
    function JobsController(jobsService) {
        this.jobsService = jobsService;
    }
    JobsController.prototype.getAllJobs = function () {
        return this.jobsService.getAllJobs();
    };
    JobsController.prototype.addnewJob = function (req, payload) {
        return this.jobsService.addJobInfo(payload, req.user);
    };
    JobsController.prototype.getOneJob = function (id) {
        return this.jobsService.getOneJob(id);
    };
    JobsController.prototype.createProposal = function (req, payload) {
        return this.jobsService.createProposal(payload, req.user);
    };
    JobsController.prototype.getJobProposals = function (req, params) {
        return this.jobsService.getJobProposals(params.id, req.user);
    };
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Get all jobs' }),
        (0, swagger_1.ApiHeader)({
            name: 'Authorization',
            description: 'Bearer token'
        }),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Get)('/'),
        (0, common_1.HttpCode)(common_1.HttpStatus.OK)
    ], JobsController.prototype, "getAllJobs");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Add job' }),
        (0, swagger_1.ApiHeader)((0, swagger_2.getAuthorizationApiHeader)()),
        (0, common_1.Post)('/'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.HttpCode)(common_1.HttpStatus.OK),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Body)())
    ], JobsController.prototype, "addnewJob");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'get job by id' }),
        (0, swagger_1.ApiResponse)({ type: Job_entity_1.Job }),
        (0, swagger_1.ApiHeader)({
            name: 'Authorization',
            description: 'Bearer token'
        }),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Get)('/:id'),
        __param(0, (0, common_1.Param)())
    ], JobsController.prototype, "getOneJob");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Create proposal for job' }),
        (0, swagger_1.ApiHeader)((0, swagger_2.getAuthorizationApiHeader)()),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Post)('/proposal'),
        (0, common_1.HttpCode)(common_1.HttpStatus.OK),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Body)())
    ], JobsController.prototype, "createProposal");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Get proposals of job' }),
        (0, swagger_1.ApiHeader)((0, swagger_2.getAuthorizationApiHeader)()),
        (0, swagger_1.ApiResponse)({ type: getJobProposalsResponseDto }),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Get)(':id/proposals'),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Param)())
    ], JobsController.prototype, "getJobProposals");
    JobsController = __decorate([
        (0, swagger_1.ApiTags)('jobs'),
        (0, common_1.Controller)('jobs')
    ], JobsController);
    return JobsController;
}());
exports.JobsController = JobsController;
