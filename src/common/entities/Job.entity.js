"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Job = void 0;
var typeorm_1 = require("typeorm");
var User_entity_1 = require("@entities/User.entity");
var Category_entity_1 = require("@entities/Category.entity");
var Skill_entity_1 = require("@entities/Skill.entity");
var Proposal_entity_1 = require("@entities/Proposal.entity");
var entities_1 = require("@constants/entities");
var Job = /** @class */ (function () {
    function Job() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Job.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], Job.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], Job.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], Job.prototype, "hourly_rate");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], Job.prototype, "available_time");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            "enum": entities_1.EnglishLevel,
            nullable: true,
            "default": null
        })
    ], Job.prototype, "english_level");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Job.prototype, "created_at");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_entity_1.User; }, function (user) { return user.jobs; })
    ], Job.prototype, "owner");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Category_entity_1.Category; }, function (category) { return category.jobs; })
    ], Job.prototype, "category");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Skill_entity_1.Skill; }),
        (0, typeorm_1.JoinTable)()
    ], Job.prototype, "skills");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Proposal_entity_1.Proposal; }, function (proposal) { return proposal.job; })
    ], Job.prototype, "proposals");
    Job = __decorate([
        (0, typeorm_1.Entity)()
    ], Job);
    return Job;
}());
exports.Job = Job;
