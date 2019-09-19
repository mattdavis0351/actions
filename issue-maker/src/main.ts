import * as github from '@actions/github';
import * as core from '@actions/core';

async function run() {
	try {
		const issueTitle = core.getInput('issueTitle');
		const myApiToken = core.getInput('apiToken');
		const octokit = new github.GitHub(myApiToken);
		const context = github.context;

		const newIssue = await octokit.issues.create({
			owner: context.repo.owner,
			repo: context.repo.repo,
			title: issueTitle
		});
		core.debug(issueTitle);
	} catch (error) {
		core.debug(error.message);
	}
}

run();
