"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var swagger_1 = require("@nestjs/swagger");
var FindJobsResponse = /** @class */ (function () {
    function FindJobsResponse() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: [
                {
                    id: 1,
                    title: 'Test job',
                    description: 'this is test job',
                    hourly_rate: 25,
                    available_time: 8,
                    english_level: 'Intermediate',
                    created_at: '2022-11-25T22:24:28.682Z',
                    owner: {
                        id: 1,
                        email: 'johndoe@test.com',
                        first_name: 'John',
                        last_name: 'Doe'
                    },
                    category: {
                        id: 1,
                        name: 'JavaScript'
                    }
                },
            ]
        })
    ], FindJobsResponse.prototype, "jobs");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: { totalCount: 1 }
        })
    ], FindJobsResponse.prototype, "meta");
    return FindJobsResponse;
}());
exports["default"] = FindJobsResponse;
