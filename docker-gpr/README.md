# Docker-GPR 🐳

A GitHub Action to upload Docker images to the GitHub Package Registry.  

**For this Action to work you need to have [access to GPR](https://github.com/features/package-registry)**

## Usage

### Action Options:

|Parameter|Description|Default Value|Required|
|:---:|---|---|:---:|
|`repo-token`|Access token allowing authentication to the GitHub API.  `GITHUB_TOKEN` is recommended.|No token was supplied... now you know why things broke!|:white_check_mark:|
|`image-name`|Desired name for your Docker image||:white_check_mark:|
|`dockerfile-location`|The location in the repo where the Dockerfile is|.||


See the [action.yml](https://github.com/mattdavis0351/actions/blob/master/docker-gpr/action.yml) for further information about this Action.

---

### Examples:

**Basic Usage**
```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: Build, Tag, Push
        uses: mattdavis0351/actions/docker-gpr@v1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          image-name: tic-tac-toe
```

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: Build, Tag, Push
        uses: mattdavis0351/actions/docker-gpr@v1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          image-name: tic-tac-toe
          dockerfile-location: dir/test
```



---

### After This Action Runs

Along your repository navigation bar you should see that you now have at least one package:

![GitHub repository package count](https://i.imgur.com/gfphpUH.png)

Inside of that tab you will find all of the packages associated with this repository as well as meta-data about them:

![GitHub Package Information](https://i.imgur.com/L2sBQz5.png)

As we can see here we have a Docker image named `tic-tac-toe` with a tag of `f29`.  The tag is comprised of the last three digits from the `COMMIT_SHA`.

Clicking the title of your package will take you to the usage screen below: 

![package usage instructions](https://i.imgur.com/uku0eZk.png)

Follow these instructions to pull your newly uploaded Docker image.


