const core = require("@actions/core");
const github = require("@actions/github");
const fm = require("front-matter");
const fs = require("fs");
const nunjucks = require("nunjucks");
const dateFilter = require("nunjucks-date-filter");

function craftArray(item) {
  if (!item) return [];
  return Array.isArray(item) ? item : item.split(", ");
}

async function run() {
  try {
    const token = core.getInput("repo-token");
    const file = fs.readFileSync(`./${core.getInput("filename")}`, "utf-8");
    const assignees = core.getInput("assignees");
    const env = nunjucks.configure({ autoescape: false });
    env.addFilter("date", dateFilter);

    const templateVariables = {
      ...github.context,
      date: Date.now()
    };

    const octokit = new github.GitHub(token);

    const { attributes, body } = fm(file);

    const templated = {
      body: env.renderString(body, templateVariables),
      title: env.renderString(attributes.title, templateVariables)
    };

    const newIssue = await octokit.issues.create({
      ...github.context.repo,
      ...templated,
      body: body,
      assignees: assignees
        ? craftArray(assignees)
        : craftArray(attributes.assignees),
      labels: craftArray(attributes.labels)
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
