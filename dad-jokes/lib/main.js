"use strict";
// const request = require('request-promise');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// const options = {
// 	method: 'GET',
// 	uri: 'https://icanhazdadjoke.com/',
// 	headers: {
// 		Accept: 'application/json',
// 		'User-Agent': 'request-promise practice, contact me at github.com/mattdavis0351'
// 	},
// 	json: true
// };
// async function run(opts) {
// 	const res = await request(opts);
// 	console.log(res.joke);
// }
// run(options);
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const myApiToken = core.getInput('apiToken');
        const octokit = new github.GitHub(myApiToken);
        const context = github.context;
        try {
            const res = yield octokit.pulls.list({
                repo: context.repo.repo,
                owner: context.repo.owner
            });
            console.log(JSON.stringify(res));
            console.log('${MY_ENV}');
        }
        catch (error) {
            console.log(`error: ${error.message}`);
            core.debug(`error: ${error.message}`);
        }
    });
}
run();
