"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FileService = void 0;
var common_1 = require("@nestjs/common");
var path = require("path");
var fs = require("fs");
var uuid = require("uuid");
var constants_1 = require("./constants");
var FileService = /** @class */ (function () {
    function FileService() {
    }
    FileService.prototype.createFile = function (fileType, file) {
        try {
            var fileExtension = file.originalname.split('.').pop();
            var fileName = "".concat(uuid.v4(), ".").concat(fileExtension);
            var typedFilePath = path.resolve(constants_1.filePath, fileType);
            if (!fs.existsSync(typedFilePath)) {
                fs.mkdirSync(typedFilePath, { recursive: true });
            }
            fs.writeFileSync(path.resolve(typedFilePath, fileName), file.buffer);
            return "".concat(fileType, "/").concat(fileName);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    };
    FileService.prototype.removeFile = function (fileName) {
        try {
            if (!fileName) {
                return;
            }
            var avatarPath = path.resolve(constants_1.filePath, fileName);
            if (fs.existsSync(avatarPath)) {
                fs.unlinkSync(avatarPath);
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    };
    FileService = __decorate([
        (0, common_1.Injectable)()
    ], FileService);
    return FileService;
}());
exports.FileService = FileService;
