"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PropertiesController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("@/modules/auth/guards/jwt-auth.guard");
var get_all_properties_dto_1 = require("./dto/get-all-properties.dto");
var PropertiesController = /** @class */ (function () {
    function PropertiesController(propertiesService) {
        this.propertiesService = propertiesService;
    }
    PropertiesController.prototype.getAll = function () {
        return this.propertiesService.getAllProperties();
    };
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'get all properties' }),
        (0, swagger_1.ApiResponse)({ type: get_all_properties_dto_1["default"] }),
        (0, swagger_1.ApiHeader)({
            name: 'Authorization',
            description: 'Bearer token'
        }),
        (0, common_1.Get)(''),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)
    ], PropertiesController.prototype, "getAll");
    PropertiesController = __decorate([
        (0, swagger_1.ApiTags)('properties'),
        (0, common_1.Controller)('properties')
    ], PropertiesController);
    return PropertiesController;
}());
exports.PropertiesController = PropertiesController;
