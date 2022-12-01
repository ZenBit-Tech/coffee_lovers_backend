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
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var platform_express_1 = require("@nestjs/platform-express");
var jwt_auth_guard_1 = require("@/modules/auth/guards/jwt-auth.guard");
var user_dto_1 = require("./dto/user.dto");
var set_profile_image_dto_1 = require("./dto/set-profile-image.dto");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    UserController.prototype.getUserInformation = function (req) {
        return req.user;
    };
    UserController.prototype.passwordResetRequest = function (dto) {
        return this.userService.sendPasswordResetMail(dto);
    };
    UserController.prototype.passwordReset = function (dto) {
        return this.userService.resetPassword(dto);
    };
    UserController.prototype.setProfileImage = function (avatar, req) {
        return this.userService.setProfileImage(avatar, req.user);
    };
    UserController.prototype.addUserInfo = function (req, payload) {
        return this.userService.addUserInfo(payload, req.user);
    };
    UserController.prototype.addEducationInfo = function (req, payload) {
        return this.userService.addEducationInfo(payload, req.user);
    };
    UserController.prototype.addWorkhistoryInfo = function (req, payload) {
        return this.userService.addWorkhistoryInfo(payload, req.user);
    };
    UserController.prototype.getFreelancerInformation = function (search, take, page) {
        if (take === void 0) { take = 10; }
        if (page === void 0) { page = 1; }
        return this.userService.getFheelancerInformation(take, page, search);
    };
    UserController.prototype.addCategoryInfo = function (req, payload) {
        return this.userService.addCategoryInfo(payload, req.user);
    };
    UserController.prototype.getCategories = function () {
        return this.userService.getCategoryInfo();
    };
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'get information about current user' }),
        (0, swagger_1.ApiResponse)({ type: user_dto_1["default"] }),
        (0, swagger_1.ApiHeader)({
            name: 'Authorization',
            description: 'Bearer token'
        }),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Get)(''),
        __param(0, (0, common_1.Request)())
    ], UserController.prototype, "getUserInformation");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'send mail for password reset' }),
        (0, common_1.Post)('passwordresetrequest'),
        (0, common_1.HttpCode)(common_1.HttpStatus.OK),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "passwordResetRequest");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: "reset user's password" }),
        (0, common_1.Post)('passwordreset'),
        (0, common_1.HttpCode)(common_1.HttpStatus.OK),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "passwordReset");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'set profile image for user' }),
        (0, swagger_1.ApiResponse)({ type: set_profile_image_dto_1["default"] }),
        (0, swagger_1.ApiHeader)({
            name: 'Authorization',
            description: 'Bearer token'
        }),
        (0, swagger_1.ApiConsumes)('multipart/form-data'),
        (0, swagger_1.ApiBody)({
            required: true,
            type: 'multipart/form-data',
            schema: {
                type: 'object',
                properties: {
                    avatar: {
                        type: 'string',
                        format: 'binary'
                    }
                }
            }
        }),
        (0, common_1.Post)('setprofileimage'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
        (0, common_1.HttpCode)(common_1.HttpStatus.OK),
        __param(0, (0, common_1.UploadedFile)()),
        __param(1, (0, common_1.Request)())
    ], UserController.prototype, "setProfileImage");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'sent user information' }),
        (0, swagger_1.ApiHeader)({
            name: 'Authorization',
            description: 'Bearer token'
        }),
        (0, common_1.Post)('user-info'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.HttpCode)(common_1.HttpStatus.OK),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "addUserInfo");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'sent education information' }),
        (0, swagger_1.ApiHeader)({
            name: 'Authorization',
            description: 'Bearer token'
        }),
        (0, common_1.Post)('education-info'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.HttpCode)(common_1.HttpStatus.OK),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "addEducationInfo");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'sent workhistory information' }),
        (0, swagger_1.ApiHeader)({
            name: 'Authorization',
            description: 'Bearer token'
        }),
        (0, common_1.Post)('workhistory-info'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.HttpCode)(common_1.HttpStatus.OK),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "addWorkhistoryInfo");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Get user information' }),
        (0, swagger_1.ApiResponse)({ type: user_dto_1["default"] }),
        (0, swagger_1.ApiHeader)({
            name: 'Authorization',
            description: 'Bearer token'
        }),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Get)('/freelancer'),
        __param(0, (0, common_1.Query)('search')),
        __param(1, (0, common_1.Query)('take', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
        __param(2, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe))
    ], UserController.prototype, "getFreelancerInformation");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Add new category for user or set category' }),
        (0, swagger_1.ApiHeader)({
            name: 'Authorization',
            description: 'Bearer token'
        }),
        (0, common_1.Post)('category'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.HttpCode)(common_1.HttpStatus.OK),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "addCategoryInfo");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Get all available categories' }),
        (0, swagger_1.ApiHeader)({
            name: 'Authorization',
            description: 'Bearer token'
        }),
        (0, common_1.Get)('category'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.HttpCode)(common_1.HttpStatus.OK)
    ], UserController.prototype, "getCategories");
    UserController = __decorate([
        (0, swagger_1.ApiTags)('user'),
        (0, common_1.Controller)('user')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
