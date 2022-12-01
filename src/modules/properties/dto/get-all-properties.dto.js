"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var swagger_1 = require("@nestjs/swagger");
var GetAllPropertiesDto = /** @class */ (function () {
    function GetAllPropertiesDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: [{ id: 1, name: 'JavaScript' }] })
    ], GetAllPropertiesDto.prototype, "categories");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: [{ id: 1, name: 'HTML' }] })
    ], GetAllPropertiesDto.prototype, "skills");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: ['Pre-Intermediate, Intermediate'] })
    ], GetAllPropertiesDto.prototype, "englishLevels");
    return GetAllPropertiesDto;
}());
exports["default"] = GetAllPropertiesDto;
