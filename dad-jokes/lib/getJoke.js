"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('request-promise');
const options = {
    method: 'GET',
    uri: 'https://icanhazdadjoke.com/',
    headers: {
        Accept: 'application/json',
        'User-Agent': 'request-promise practice, contact me at github.com/mattdavis0351'
    },
    json: true
};
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield request(options);
        // console.log(res.joke);
        return res.joke;
    });
}
// getJoke();
exports.default = getJoke;
