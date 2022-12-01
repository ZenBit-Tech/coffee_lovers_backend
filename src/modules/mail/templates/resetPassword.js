"use strict";
exports.__esModule = true;
var resetPasswordTemplate = function (url) {
    return "\n    <html>\n      <head>\n        <style>\n          p {\n            font-size: 18px;\n          }\n          button {\n            padding: 10px 25px;\n            background-color: #0202b8;\n            border: none;\n            border-radius: 5px;  \n          }\n          button>a {\n            text-decoration: none;\n            color: #fff;\n            font-size: 14px;\n          }\n          button>a>font {\n            color: #fff;\n          }\n        </style>\n      </head>\n      <body>\n        <p>There is a link to reset password on platform</p>\n        <button><a href=\"".concat(url, "\" target=\"_blank\"><font>Continue</font></a></button>\n      </body>\n    </html>\n  ");
};
exports["default"] = resetPasswordTemplate;
