# Open-Pull-Request

A GitHub Action for openening pull requests.  
- This Action will not run on a `push` event if the `push` event was triggered by a **branch creation**.  
- This Action will not run if the head branch is the same as the base branch.

## Usage

### Action Options:

|Parameter|Description|Default Value|Required|
|---|---|---|:---:|
|`apiToken`|Access token allowing authentication to the GitHub API.  Should be passed as a secret using `${{secrets.<some repo secret>}}`.|No token was supplied... now you know why things broke!|:white_check_mark:|
|`headBranch`|Name of the branch containing the current changes.  The source of your pull request.  It is reccommended to use `${{github.ref}}` in your workflow for this value.||:white_check_mark:|
|`baseBranch`|Name of the branch to receive changes.  The destination of your pull request.|master|:white_check_mark:|
|`pullTitle`|Title of the pull request.  Includes a timestamp in the form of `[year-month-day]`.|default|:white_check_mark:|
|`pullBody`|Contents of the pull request body.|This pull request was created by an Action.||

See the [action.yml](https://github.com/mattdavis0351/actions/blob/master/open-pull-request/action.yml) for further information about this Action.

### Examples:

**Basic Usage**
```yaml
name: "Open Pull Request"
on:
  push:
    branches:
      - "*"
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - uses: mattdavis0351/actions/open-pull-request@master
        with:
          headBranch: "my-current-branch"
          apiToken: ${{ secrets.MY_API_TOKEN }}        
```

**Combined with other Actions**
```yaml
name: "I'm combined with other actions"
on:
  push:
    branches:
      - "*"

jobs:
  job1:
    runs-on: ubuntu-latest
    name: "Combined Actions"
    steps:
      - name: Checkout
        uses: actions/checkout@v1
        
      - name: Some Second Action
        run: <some run command>
        
      - name: Some Third Action
        uses: actions/fake-action@master
        with:
          fakeParam1: "A fake value"

      - name: Open PR
        uses: mattdavis0351/actions/open-pull-request@master
        with:
          headBranch: "my-current-branch"
          apiToken: ${{ secrets.MY_API_TOKEN }}
          
```

**With Full Parameters and Recommendations**
```yaml
name: "Open pull request with full params"
on:
  push:
    branches:
      - "*"

jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - uses: mattdavis0351/actions/open-pull-request@master
        with:
          headBranch: ${{github.ref}}
          baseBranch: master
          apiToken: ${{ secrets.MY_API_TOKEN }}
          pullTitle: "I really need to merge these changes"
          pullBody: "I will show up in the body of the pull request"
```
