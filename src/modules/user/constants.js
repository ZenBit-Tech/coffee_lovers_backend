"use strict";
exports.__esModule = true;
exports.passwordMinLength = exports.passwordValidationMessage = exports.passwordValidationRexExp = void 0;
exports.passwordValidationRexExp = /(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
exports.passwordValidationMessage = 'password must contain uppercase and lowercase letters';
exports.passwordMinLength = 5;
