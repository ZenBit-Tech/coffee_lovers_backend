"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var swagger_1 = require("@nestjs/swagger");
var UserDto = /** @class */ (function () {
    function UserDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 123 })
    ], UserDto.prototype, "id");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'test@test.com' })
    ], UserDto.prototype, "email");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'John' })
    ], UserDto.prototype, "first_name");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Doe' })
    ], UserDto.prototype, "last_name");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'https://localhost:4200/image.img' })
    ], UserDto.prototype, "profile_image");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Freelancer' })
    ], UserDto.prototype, "role");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '4' })
    ], UserDto.prototype, "available_time");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Front-end developer' })
    ], UserDto.prototype, "position");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 30 })
    ], UserDto.prototype, "hourly_rate");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 377 })
    ], UserDto.prototype, "category_id");
    return UserDto;
}());
exports["default"] = UserDto;
