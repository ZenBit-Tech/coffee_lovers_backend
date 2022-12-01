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
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var google_auth_library_1 = require("google-auth-library");
var user_service_1 = require("@/modules/user/user.service");
var AuthService = /** @class */ (function () {
    function AuthService(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    AuthService.prototype.googleLogin = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var client, ticket, userData, dataLogin, user, signupResponse, loginResponse, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        client = new google_auth_library_1.OAuth2Client(this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET'));
                        return [4 /*yield*/, client.verifyIdToken({
                                idToken: body.credential,
                                audience: this.configService.get('GOOGLE_CLIENT_ID')
                            })];
                    case 1:
                        ticket = _a.sent();
                        userData = ticket.getPayload();
                        if (!userData.email) {
                            throw new common_1.HttpException('Please check user data', common_1.HttpStatus.BAD_REQUEST);
                        }
                        dataLogin = {
                            email: userData.email,
                            first_name: userData.given_name,
                            second_name: userData.family_name
                        };
                        return [4 /*yield*/, this.userService.findByEmail(dataLogin.email)];
                    case 2:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.signUp(dataLogin)];
                    case 3:
                        signupResponse = _a.sent();
                        return [2 /*return*/, signupResponse];
                    case 4: return [4 /*yield*/, this.signIn(dataLogin)];
                    case 5:
                        loginResponse = _a.sent();
                        return [2 /*return*/, loginResponse];
                    case 6:
                        error_1 = _a.sent();
                        if (error_1 instanceof common_1.HttpException) {
                            throw error_1;
                        }
                        throw new common_1.HttpException('', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.signUp = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.userService.findByEmail(dto.email)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            throw new common_1.BadRequestException('User is already exist');
                        }
                        return [4 /*yield*/, this.userService.create(dto)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.createTokens(dto.email)];
                    case 3:
                        error_2 = _a.sent();
                        if (error_2 instanceof common_1.HttpException) {
                            throw error_2;
                        }
                        throw new common_1.HttpException('', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.signIn = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isPassEquals, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userService.findByEmail(dto.email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.BadRequestException('invalid email');
                        }
                        if (!!user.is_google) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt.compare(dto.password, user.password)];
                    case 2:
                        isPassEquals = _a.sent();
                        if (!isPassEquals) {
                            throw new common_1.BadRequestException('invalid password');
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, this.createTokens(dto.email)];
                    case 4:
                        error_3 = _a.sent();
                        if (error_3 instanceof common_1.HttpException) {
                            throw error_3;
                        }
                        throw new common_1.HttpException('', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.createTokens = function (email) {
        var payload = { email: email };
        return {
            access_token: this.jwtService.sign(payload)
        };
    };
    __decorate([
        __param(0, (0, common_1.Body)())
    ], AuthService.prototype, "googleLogin");
    AuthService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)(user_service_1.UserService))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
