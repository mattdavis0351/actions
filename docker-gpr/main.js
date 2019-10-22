const exec = require("@actions/exec");
const core = require("@actions/core");

async function run() {
  try {
    const token = core.getInput("repo-token");
    const username = process.env.GITHUB_ACTOR;
    const imageName = core.getInput("image-name");
    const githubRepo = process.env.GITHUB_REPOSITORY;
    const tag = process.env.GITHUB_SHA;

    await exec.exec(`docker login -u ${username} -p ${token}`);
    await exec.exec(
      `docker build -t docker.pkg.github.com/${githubRepo}/${imageName}:${tag.slice(
        tag.length - 3
      )} .`
    );
    await exec.exec(
      `docker push docker.pkg.github.com/${githubRepo}/${imageName}:${tag.slice(
        tag.length - 3
      )}`
    );
  } catch (error) {
    console.error(error);
  }
}

run();

// GITHUB_ACTOR	The name of the person or app that initiated the workflow. For example, octocat.
// GITHUB_REPOSITORY	The owner and repository name. For example, octocat/Hello-World.
