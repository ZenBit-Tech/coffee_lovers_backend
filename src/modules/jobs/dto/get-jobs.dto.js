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
var entities_1 = require("@constants/entities");
var GetJobsDto = /** @class */ (function () {
    function GetJobsDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 10 }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumberString)()
    ], GetJobsDto.prototype, "limit");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 0 }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumberString)()
    ], GetJobsDto.prototype, "offset");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: [1, 2, 3] }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsArray)()
    ], GetJobsDto.prototype, "skills");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: [1, 2, 3] }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsArray)()
    ], GetJobsDto.prototype, "categories");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 20 }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumberString)()
    ], GetJobsDto.prototype, "hourly_rate_start");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 40 }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumberString)()
    ], GetJobsDto.prototype, "hourly_rate_end");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 8 }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumberString)()
    ], GetJobsDto.prototype, "available_time");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: entities_1.EnglishLevel.INTERMEDIATE }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], GetJobsDto.prototype, "english_level");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Website' }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], GetJobsDto.prototype, "search");
    return GetJobsDto;
}());
exports["default"] = GetJobsDto;
