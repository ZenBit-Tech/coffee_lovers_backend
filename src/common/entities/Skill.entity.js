"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Skill = void 0;
var typeorm_1 = require("typeorm");
var Skill = /** @class */ (function () {
    function Skill() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Skill.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ unique: true, nullable: false })
    ], Skill.prototype, "name");
    Skill = __decorate([
        (0, typeorm_1.Entity)()
    ], Skill);
    return Skill;
}());
exports.Skill = Skill;
