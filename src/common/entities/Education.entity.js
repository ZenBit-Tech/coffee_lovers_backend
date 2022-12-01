"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Education = void 0;
var typeorm_1 = require("typeorm");
var User_entity_1 = require("@entities/User.entity");
var Education = /** @class */ (function () {
    function Education() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Education.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], Education.prototype, "education_descr");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], Education.prototype, "education_from");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], Education.prototype, "education_to");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_entity_1.User; }, function (user) { return user.educations; })
    ], Education.prototype, "user");
    Education = __decorate([
        (0, typeorm_1.Entity)()
    ], Education);
    return Education;
}());
exports.Education = Education;
