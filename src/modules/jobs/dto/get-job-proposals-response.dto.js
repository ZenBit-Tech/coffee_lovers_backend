"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var swagger_1 = require("@nestjs/swagger");
var getJobProposalsResponseDto = /** @class */ (function () {
    function getJobProposalsResponseDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: {
                id: 1,
                title: 'Test job',
                description: 'This is test job',
                hourly_rate: 50,
                available_time: 'Full-time',
                english_level: 'Intermediate',
                created_at: '2022-11-27T14:44:05.241Z'
            }
        })
    ], getJobProposalsResponseDto.prototype, "job");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: [
                {
                    id: 1,
                    hourly_rate: 30,
                    cover_letter: 'Hello, it is test proposal',
                    user: {
                        id: 1,
                        email: 'johndoe@test.com',
                        first_name: 'John',
                        last_name: 'Doe'
                    }
                },
            ]
        })
    ], getJobProposalsResponseDto.prototype, "proposals");
    return getJobProposalsResponseDto;
}());
exports["default"] = getJobProposalsResponseDto;
