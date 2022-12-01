"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Proposal = void 0;
var typeorm_1 = require("typeorm");
var User_entity_1 = require("@entities/User.entity");
var Job_entity_1 = require("@entities/Job.entity");
var Proposal = /** @class */ (function () {
    function Proposal() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Proposal.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], Proposal.prototype, "hourly_rate");
    __decorate([
        (0, typeorm_1.Column)({ "default": null, nullable: true })
    ], Proposal.prototype, "cover_letter");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_entity_1.User; }, function (user) { return user.proposals; })
    ], Proposal.prototype, "user");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Job_entity_1.Job; }, function (job) { return job.proposals; })
    ], Proposal.prototype, "job");
    Proposal = __decorate([
        (0, typeorm_1.Entity)()
    ], Proposal);
    return Proposal;
}());
exports.Proposal = Proposal;
