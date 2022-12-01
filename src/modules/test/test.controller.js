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
exports.TestController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var TestController = /** @class */ (function () {
    function TestController(testService) {
        this.testService = testService;
    }
    TestController.prototype.create = function (dto) {
        return this.testService.create(dto);
    };
    TestController.prototype.getAll = function () {
        return this.testService.findAll();
    };
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'test post' }),
        (0, common_1.Post)('create'),
        __param(0, (0, common_1.Body)())
    ], TestController.prototype, "create");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'test get' }),
        (0, common_1.Get)('all')
    ], TestController.prototype, "getAll");
    TestController = __decorate([
        (0, swagger_1.ApiTags)('test'),
        (0, common_1.Controller)('test')
    ], TestController);
    return TestController;
}());
exports.TestController = TestController;
