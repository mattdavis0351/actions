const core = require("@actions/core");
const github = require("@actions/github");
const fm = require("front-matter");
const fs = require("fs");


function craftArray(list) {
  if (!list) return [];
  return Array.isArray(list) ? list : list.split(", ");
}

async function run() {
  try {
    const token = core.getInput("repo-token");
    const file = fs.readFileSync(`./${core.getInput("filename")}`);
    const assignees = core.getInput("assigness");
    // const issueTitle = core.getInput("issueTitle");
    // const issueBody = core.getInput("issueBody");

    const octokit = new github.GitHub(token);
    const context = github.context;

    const { attributes, body } = fm(file);
    console.log(`front-matter arrtibutes: ${attributes}`)
    core.info(attributes)
    const newIssue = await octokit.issues.create({
      owner: context.repo.owner,
      repo: context.repo.repo,
      title: attributes.title,
      body: body,
      assignees: assignees ? craftArray(assignees) : craftArray(attributes.assignees),
      labels: craftArray(attributes.labels)
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
