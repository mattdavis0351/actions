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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const github = __importStar(require("@actions/github"));
const core = __importStar(require("@actions/core"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const pullTitle = core.getInput('pullTitle');
        const myApiToken = core.getInput('apiToken');
        const baseBranch = core.getInput('baseBranch');
        const headBranch = core.getInput('headBranch');
        const octokit = new github.GitHub(myApiToken);
        const context = github.context;
        try {
            // const newPull = await octokit.pulls.create({
            // 	owner: context.repo.owner,
            // 	repo: context.repo.repo,
            // 	title: pullTitle,
            // 	base: baseBranch,
            // 	head: headBranch
            // });
            // core.debug(JSON.stringify(newPull));
            core.debug(JSON.stringify(context.ref));
        }
        catch (error) {
            core.debug(error.message);
        }
    });
}
run();
