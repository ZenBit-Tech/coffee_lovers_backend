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
var AddJobDescriptionDto = /** @class */ (function () {
    function AddJobDescriptionDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Landing page' }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], AddJobDescriptionDto.prototype, "title");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'I need create landing page' }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], AddJobDescriptionDto.prototype, "description");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 50 }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)()
    ], AddJobDescriptionDto.prototype, "hourly_rate");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 4 }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)()
    ], AddJobDescriptionDto.prototype, "available_time");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 4 }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)()
    ], AddJobDescriptionDto.prototype, "category");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Upper-intermadiate' }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], AddJobDescriptionDto.prototype, "english_level");
    return AddJobDescriptionDto;
}());
exports["default"] = AddJobDescriptionDto;
