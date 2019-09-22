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

	try {
		if (context.payload.created === true) {
			console.log(`this Action will not run on 'push' if the 'push' is from a branch creation`);
			return;
		} else {
			if (headBranch !== 'refs/heads/' + baseBranch) {
				const newPull = await octokit.pulls.create({
					owner: context.repo.owner,
					repo: context.repo.repo,
					title: pullTitle,
					base: baseBranch,
					head: headBranch,
					body: pullBody
				});
			} else {
				console.log(`trying to open PR from: ${baseBranch} to ${baseBranch}`);
				console.log(`This step will do nothing because that doesn't make sense`);
				return;
			}
		}
	} catch (error) {
		console.log(pullTitle);
		core.debug(`title: ${typeof pullTitle}`);
		core.debug(`error: ${error.message}`);
	}
}

run();
