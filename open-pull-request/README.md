# Open-Pull-Request

A GitHub Action for openening pull requests.  
- This Action will not run on a `push` event if the `push` event was triggered by a **branch creation**.  
- This Action will not run if the head branch is the same as the base branch.

## Usage

### Action Options:

|Parameter|Description|Default Value|Required|
|---|---|---|:---:|
|`apiToken`|Access token allowing authentication to the GitHub API.  `GITHUB_TOKEN` is recommended.|No token was supplied... now you know why things broke!|:white_check_mark:|
|`headBranch`|Name of the branch containing the current changes.  The source of your pull request.  It is reccommended to use `${{github.ref}}` in your workflow for this value.||:white_check_mark:|
|`baseBranch`|Name of the branch to receive changes.  The destination of your pull request.|master|:white_check_mark:|
|`pullTitle`|Title of the pull request.  Includes a timestamp in the form of `[year-month-day]`.|Created by the Open-Pull-Request Action on[todays-date]|:white_check_mark:|
|`pullBody`|Contents of the pull request body.  Can either be a `string` or `file`.  If a file is specified ommit the root directory.|"This PR was created by the Open-Pull-Request Action and since you didn't specify a `body` to be placed here, this is the message you get :smile:";
||

See the [action.yml](https://github.com/mattdavis0351/actions/blob/master/open-pull-request/action.yml) for further information about this Action.

### Examples:

**Basic Usage**
```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - uses: mattdavis0351/actions/open-pull-request@master
        with:
          headBranch: "my-current-branch"
          apiToken: ${{ secrets.GITHUB_TOKEN }}        
```

**Combined with other Actions**
```yaml
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
          apiToken: ${{ secrets.GITHUB_TOKEN }}
          
```

**With Full Parameters and Recommendations Using a `pullBody` String**
```yaml
- uses: mattdavis0351/actions/open-pull-request@master
  with:
    headBranch: ${{github.ref}}
    baseBranch: master
    apiToken: ${{ secrets.GITHUB_TOKEN }}
    pullTitle: "I really need to merge these changes"
    pullBody: "I will show up in the body of the pull request"
```

**With Full Parameters and Recommendations Using a `pullBody` File**
```yaml
- uses: mattdavis0351/actions/open-pull-request@master
  with:
    headBranch: ${{github.ref}}
    baseBranch: master
    apiToken: ${{ secrets.GITHUB_TOKEN }}
    pullTitle: "I really need to merge these changes"
    pullBody: folder1/folder2/file.md 
```

**`pullBody:` CAN point to a hidden directory such as `.github`.**
```yaml
- uses: mattdavis0351/actions/open-pull-request@master
  with:
    headBranch: ${{github.ref}}
    baseBranch: master
    apiToken: ${{ secrets.GITHUB_TOKEN }}
    pullTitle: "I really need to merge these changes"
    pullBody: .github/pr-templates/file.md 
```
