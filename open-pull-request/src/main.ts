import * as github from '@actions/github';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as fs from 'fs';

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

async function createBody(metadata: string): Promise<string> {
	let body: string = metadata;
	console.log(metadata);

	if (metadata === 'default') {
		body =
			"This PR was created by the Open-Pull-Request Action and since you didn't specify a `body` to be placed here, this is the message you get :smile:";
	} else if (metadata.endsWith('.md')) {
		// read the contents of .md
		// convert to string if not already
		// place in body
		// await exec.exec('ls .');
		// await exec.exec(`cat ./${metadata}`);

		let data: any;
		fs.readFile(`./${metadata}`, 'utf8', (err, contents): string => (data = contents));
		// body = data;
		console.log('made it into .md loop');
		console.log(data);
	}

	return body;
}

async function run() {
	const pullTitle = createTitle(core.getInput('pullTitle'));
	const pullBody = await createBody(core.getInput('pullBody'));
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
		console.log(`error: ${error.message}`);
		core.debug(`error: ${error.message}`);
	}
}

run();
