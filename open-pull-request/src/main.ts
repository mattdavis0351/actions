import * as github from '@actions/github';
import * as core from '@actions/core';

async function run() {
	const pullTitle = core.getInput('pullTitle');
	const pullBody = core.getInput('pullBody');
	const myApiToken = core.getInput('apiToken');
	const baseBranch = core.getInput('baseBranch');
	const headBranch = core.getInput('headBranch');
	const octokit = new github.GitHub(myApiToken);
	const context = github.context;
	const ref = JSON.stringify(context.payload.ref);

	try {
		if (headBranch !== baseBranch) {
			console.log(`head is: ${headBranch}`);
			const newPull = await octokit.pulls.create({
				owner: context.repo.owner,
				repo: context.repo.repo,
				title: pullTitle,
				base: baseBranch,
				head: headBranch,
				body: JSON.stringify(context.payload)
			});
		} else {
			console.log(`trying to open PR from: ${baseBranch} to ${baseBranch}`);
		}

		// core.debug(JSON.stringify(newPull));

		// core.debug(JSON.stringify(headBranch));
	} catch (error) {
		core.debug(error.message);
	}
}

run();
