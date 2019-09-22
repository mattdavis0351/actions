import * as github from '@actions/github';
import * as core from '@actions/core';

function createTitle(metadata: string): string {
	let title: string;
	let today = new Date();
	let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	if (metadata === 'default') {
		title = `Created by the Open-Pull-Request Action on [${date}]`;
		return title;
	} else {
		return `${metadata} [${date}]`;
	}
}

async function run() {
	const pullTitle = createTitle(core.getInput('pullTitle'));
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
		core.debug(`error: ${error.message}`);
	}
}

run();
