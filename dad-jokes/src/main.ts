// const request = require('request-promise');

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

import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
	const myApiToken = core.getInput('apiToken');
	const octokit = new github.GitHub(myApiToken);
	const context = github.context;

	try {
		const res = await octokit.pulls.list({
			repo: context.repo.repo,
			owner: context.repo.owner
		});

		console.log(JSON.stringify(res));
	} catch (error) {
		console.log(`error: ${error.message}`);
		core.debug(`error: ${error.message}`);
	}
}

run();
