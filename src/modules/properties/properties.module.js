"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PropertiesModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var Skill_entity_1 = require("@entities/Skill.entity");
var Category_entity_1 = require("@entities/Category.entity");
var properties_service_1 = require("./properties.service");
var properties_controller_1 = require("./properties.controller");
var PropertiesModule = /** @class */ (function () {
    function PropertiesModule() {
    }
    PropertiesModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([Category_entity_1.Category, Skill_entity_1.Skill])],
            controllers: [properties_controller_1.PropertiesController],
            providers: [properties_service_1.PropertiesService],
            exports: [properties_service_1.PropertiesService]
        })
    ], PropertiesModule);
    return PropertiesModule;
}());
exports.PropertiesModule = PropertiesModule;
