import getJoke from './getJoke';
import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
	try {
		const myApiToken = core.getInput('apiToken');
		const octokit = new github.GitHub(myApiToken);
		const context = github.context;

		const joke = await getJoke();

		const res = await octokit.issues.create({
			repo: context.repo.repo,
			owner: context.repo.owner,
			title: 'dad-joke test',
			body: joke
		});
	} catch (error) {
		console.log(`error: ${error.message}`);
		core.debug(`error: ${error.message}`);
	}
}

run();
