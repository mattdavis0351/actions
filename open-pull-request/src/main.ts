import * as github from '@actions/github';
import * as core from '@actions/core';

async function run() {
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
	} catch (error) {
		core.debug(error.message);
	}
}

run();
