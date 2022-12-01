"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var Category_entity_1 = require("@entities/Category.entity");
var entities_1 = require("@constants/entities");
var Proposal_entity_1 = require("@entities/Proposal.entity");
var Education_entity_1 = require("./Education.entity");
var Job_entity_1 = require("./Job.entity");
var Skill_entity_1 = require("./Skill.entity");
var WorkHistory_entity_1 = require("./WorkHistory.entity");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ unique: true })
    ], User.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], User.prototype, "first_name");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], User.prototype, "last_name");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], User.prototype, "profile_image");
    __decorate([
        (0, typeorm_1.Column)({ "default": false, nullable: true })
    ], User.prototype, "is_google");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], User.prototype, "reset_password_key");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], User.prototype, "available_time");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], User.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], User.prototype, "hourly_rate");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], User.prototype, "position");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], User.prototype, "other_experience");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            "enum": entities_1.EnglishLevel,
            nullable: true,
            "default": null
        })
    ], User.prototype, "english_level");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], User.prototype, "category_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            "enum": entities_1.Role,
            nullable: true,
            "default": null
        })
    ], User.prototype, "role");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return WorkHistory_entity_1.WorkHistory; }, function (history) { return history.user; })
    ], User.prototype, "workHistory");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Education_entity_1.Education; }, function (education) { return education.user; })
    ], User.prototype, "educations");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Job_entity_1.Job; }, function (job) { return job.owner; })
    ], User.prototype, "jobs");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Skill_entity_1.Skill; }),
        (0, typeorm_1.JoinTable)()
    ], User.prototype, "skills");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Category_entity_1.Category; }, function (category) { return category.user; })
    ], User.prototype, "category");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Proposal_entity_1.Proposal; }, function (proposal) { return proposal.user; })
    ], User.prototype, "proposals");
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;
