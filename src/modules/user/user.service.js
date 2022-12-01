"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_2 = require("typeorm");
var bcrypt = require("bcrypt");
var User_entity_1 = require("@entities/User.entity");
var Education_entity_1 = require("@entities/Education.entity");
var WorkHistory_entity_1 = require("@entities/WorkHistory.entity");
var types_1 = require("@/modules/file/types");
var Category_entity_1 = require("@/common/entities/Category.entity");
var UserService = /** @class */ (function () {
    function UserService(educationRepository, categoryRepository, userRepository, configService, mailService, fileService, workHistoryRepository) {
        this.educationRepository = educationRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.configService = configService;
        this.mailService = mailService;
        this.fileService = fileService;
        this.workHistoryRepository = workHistoryRepository;
    }
    UserService.prototype.create = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.hashPassword(dto)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder()
                                .insert()
                                .into(User_entity_1.User)
                                .values([user])
                                .execute()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 3:
                        error_1 = _a.sent();
                        throw new common_1.InternalServerErrorException();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.addEducationToUser = function (user, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.educationRepository
                                .createQueryBuilder()
                                .insert()
                                .into(Education_entity_1.Education)
                                .values(payload.map(function (el) { return (__assign(__assign({}, el), { user: user })); }))
                                .execute()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        if (error_2 instanceof common_1.HttpException) {
                            throw error_2;
                        }
                        throw new common_1.InternalServerErrorException();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.addWorkToUser = function (user, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.workHistoryRepository
                                .createQueryBuilder()
                                .insert()
                                .into(WorkHistory_entity_1.WorkHistory)
                                .values(payload.map(function (el) { return (__assign(__assign({}, el), { user: user })); }))
                                .execute()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        if (error_3 instanceof common_1.HttpException) {
                            throw error_3;
                        }
                        throw new common_1.InternalServerErrorException();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.findOne = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder()
                                .select('id')
                                .from(User_entity_1.User, 'id')
                                .where(payload)
                                .getOne()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 2:
                        error_4 = _a.sent();
                        throw new common_1.InternalServerErrorException();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.findOne({ email: email })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 2:
                        error_5 = _a.sent();
                        throw new common_1.InternalServerErrorException();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.updateUserByEmail = function (email, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder()
                                .update(User_entity_1.User)
                                .set(payload)
                                .where({ email: email })
                                .execute()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        throw new common_1.InternalServerErrorException();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.sendPasswordResetMail = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.findByEmail(dto.email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.BadRequestException('User not found');
                        }
                        return [4 /*yield*/, this.mailService.sendResetPassword(user)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        if (error_7 instanceof common_1.HttpException) {
                            throw error_7;
                        }
                        throw new common_1.InternalServerErrorException();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.resetPassword = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, payload, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.findOne({ reset_password_key: dto.key })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.BadRequestException('Invalid key');
                        }
                        return [4 /*yield*/, this.hashPassword({ password: dto.password })];
                    case 2:
                        payload = _a.sent();
                        payload.reset_password_key = null;
                        return [4 /*yield*/, this.updateUserByEmail(user.email, payload)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_8 = _a.sent();
                        if (error_8 instanceof common_1.HttpException) {
                            throw error_8;
                        }
                        throw new common_1.InternalServerErrorException();
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.setProfileImage = function (avatar, user) {
        return __awaiter(this, void 0, void 0, function () {
            var file, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        file = this.fileService.createFile(types_1.FileType.image, avatar);
                        this.fileService.removeFile(user.profile_image);
                        return [4 /*yield*/, this.updateUserByEmail(user.email, { profile_image: file })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { file: file }];
                    case 2:
                        error_9 = _a.sent();
                        throw new common_1.InternalServerErrorException();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.hashPassword = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var user, hashedPassword, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        user = __assign({}, payload);
                        if (!user.password) return [3 /*break*/, 2];
                        return [4 /*yield*/, bcrypt.hash(user.password, +this.configService.get('BCRYPT_SALT_ROUNDS'))];
                    case 1:
                        hashedPassword = _a.sent();
                        user.password = hashedPassword;
                        _a.label = 2;
                    case 2: return [2 /*return*/, user];
                    case 3:
                        error_10 = _a.sent();
                        throw new common_1.InternalServerErrorException();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.addUserInfo = function (payload, user) {
        return __awaiter(this, void 0, void 0, function () {
            var skills, payloadNoSkills, userWithSkills, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        skills = payload.skills, payloadNoSkills = __rest(payload, ["skills"]);
                        if (!skills) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder('user')
                                .leftJoinAndSelect('user.skills', 'skills')
                                .where('user.id = :id', { id: user.id })
                                .getOne()];
                    case 1:
                        userWithSkills = _a.sent();
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder()
                                .relation(User_entity_1.User, 'skills')
                                .of(user.id)
                                .addAndRemove(skills, userWithSkills.skills)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.updateUserByEmail(user.email, payloadNoSkills)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_11 = _a.sent();
                        if (error_11 instanceof common_1.HttpException) {
                            throw error_11;
                        }
                        throw new common_1.InternalServerErrorException();
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.addEducationInfo = function (payload, user) {
        return __awaiter(this, void 0, void 0, function () {
            var currentUser, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.findByEmail(user.email)];
                    case 1:
                        currentUser = _a.sent();
                        return [4 /*yield*/, this.addEducationToUser(currentUser, payload)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_12 = _a.sent();
                        if (error_12 instanceof common_1.HttpException) {
                            throw error_12;
                        }
                        throw new common_1.InternalServerErrorException();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.addWorkhistoryInfo = function (payload, user) {
        return __awaiter(this, void 0, void 0, function () {
            var currentUser, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.findByEmail(user.email)];
                    case 1:
                        currentUser = _a.sent();
                        return [4 /*yield*/, this.addWorkToUser(currentUser, payload)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_13 = _a.sent();
                        if (error_13 instanceof common_1.HttpException) {
                            throw error_13;
                        }
                        throw new common_1.InternalServerErrorException();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getFheelancerInformation = function (take, page, search) {
        return __awaiter(this, void 0, void 0, function () {
            var currentUser, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder('user')
                                .leftJoinAndSelect('user.category', 'category')
                                .skip((page - 1) * take)
                                .take(take)
                                .where(new typeorm_2.Brackets(function (qb) {
                                qb.where('user.category LIKE :search')
                                    .orWhere('user.position LIKE :search')
                                    .orWhere('user.hourly_rate LIKE :search')
                                    .orWhere('user.available_time LIKE :search', {
                                    search: "%".concat(search, "%")
                                });
                            }))
                                .getManyAndCount()];
                    case 1:
                        currentUser = _a.sent();
                        return [2 /*return*/, currentUser];
                    case 2:
                        error_14 = _a.sent();
                        if (error_14 instanceof common_1.HttpException) {
                            throw error_14;
                        }
                        throw new common_1.InternalServerErrorException();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.addCategoryInfo = function (payload, user) {
        return __awaiter(this, void 0, void 0, function () {
            var error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder()
                                .relation(User_entity_1.User, 'category')
                                .of({ id: user.id })
                                .set({ id: payload.id })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_15 = _a.sent();
                        if (error_15 instanceof common_1.HttpException) {
                            throw error_15;
                        }
                        throw new common_1.InternalServerErrorException();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getCategoryInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Categories, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.categoryRepository
                                .createQueryBuilder('category')
                                .getMany()];
                    case 1:
                        Categories = _a.sent();
                        return [2 /*return*/, Categories];
                    case 2:
                        error_16 = _a.sent();
                        if (error_16 instanceof common_1.HttpException) {
                            throw error_16;
                        }
                        throw new common_1.InternalServerErrorException();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(Education_entity_1.Education)),
        __param(1, (0, typeorm_1.InjectRepository)(Category_entity_1.Category)),
        __param(2, (0, typeorm_1.InjectRepository)(User_entity_1.User)),
        __param(6, (0, typeorm_1.InjectRepository)(WorkHistory_entity_1.WorkHistory))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
