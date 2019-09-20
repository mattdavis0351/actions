import * as exec from '@actions/exec';
import * as core from '@actions/core';

async function run() {
	try {
		console.log(`setting up ./lib directory`);
		await exec.exec('mkdir lib');

		console.log('using TSC to compile TS files to JS');
		await exec.exec('npm run build');
	} catch (error) {
		core.debug(error.message);
	}
}

run();
