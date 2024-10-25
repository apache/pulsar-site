# Previewing content

This guide explains why and how to preview Pulsar content locally with detailed steps and various examples.

## Why preview changes locally?

It is **required** to preview your changes locally and attach the preview screenshots in your PR description. It brings many benefits, including but not limited to:

* You can test your writings. It's a way to check whether you use the correct [syntax](document-syntax.md). You **must ensure** docs can be compiled and published correctly.
* You can get your PR merged more quickly. Reviewers know your changes clearly and can speed up the review process.

## How to preview changes locally?

Pulsar documentation is built using [Docusaurus](https://docusaurus.io/). To preview your changes as you edit the files, you can run a local development server that serves your website and reflect the latest changes.

### Prerequisites

To verify docs are built correctly before submitting a contribution, you should set up your local environment to build and display the docs locally.

* Node >= 20.0.0 (latest LTS recommended)
* Corepack available and enabled (`corepack enable`)
* Although you can use Linux, macOS, or Windows to build locally the Pulsar documentation, macOS is the preferred build environment as it offers the most complete support for documentation building.

Installing prerequisites with [homebrew](https://brew.sh/) on MacOS or Linux:

```shell
brew install node
brew install corepack || brew link corepack
corepack enable
```

Sometimes homebrew has corepack installed, but it's not available. In that case, `brew link corepack` fixes the problem.
Don't install `yarn` separately since it's part of `corepack`.

### Preview changes

Pulsar website changes refer to all the changes made to the Pulsar website, including but not limited to the following pages:

* [User documents](pathname:///docs)
* [Contribution guide](about.md)
* [Release notes](pathname:///release-notes/)
* [Ecosystem page](pathname:///ecosystem)
* [Case studies](pathname:///case-studies)
* ...

Follow these steps to preview the website changes.

1. Change to the working directory:

    ```bash
    cd pulsar-site/
    ```

2. Run the following command to preview changes:

   ```bash
   # Preview changes on master
   ./preview.sh current

   # preview changes on a specific version
   ./preview.sh 2.10.x

   # preview changes on multiple versions
   ./preview.sh 2.10.x 2.9.x ...
   ```

By default, a browser window will open at [http://localhost:3000](http://localhost:3000) to show the changes:

![alt_text](media/website-preview.png)

:::tip

When you click on `Docs`, you are taken to the latest stable version (e.g., `http://localhost:3000/docs/2.10.x/`). If you want to preview changes on `master`, change the URL to `http://localhost:3000/docs/next`

:::
### Stop preview

Switch to your command-line interface and press **Control+C**.
