"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var constants_1 = require("@/modules/user/constants");
var UpdateUserDto = /** @class */ (function () {
    function UpdateUserDto() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.MinLength)(constants_1.passwordMinLength),
        (0, class_validator_1.Matches)(constants_1.passwordValidationRexExp, {
            message: constants_1.passwordValidationMessage
        })
    ], UpdateUserDto.prototype, "password");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateUserDto.prototype, "first_name");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateUserDto.prototype, "last_name");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateUserDto.prototype, "profile_image");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateUserDto.prototype, "reset_password_key");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Full-Time' }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateUserDto.prototype, "available_time");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'I am hard-working person, like reading' }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateUserDto.prototype, "description");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 12 }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)()
    ], UpdateUserDto.prototype, "hourly_rate");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Full-Stack Developer' }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateUserDto.prototype, "position");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '1C Development, UX/UI educational exp' }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateUserDto.prototype, "other_experience");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Intermediate' }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateUserDto.prototype, "english_level");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 10 }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)()
    ], UpdateUserDto.prototype, "category_id");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Freelancer' }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateUserDto.prototype, "role");
    return UpdateUserDto;
}());
exports["default"] = UpdateUserDto;
