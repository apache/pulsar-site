---
id: document-preview
title: Content Preview
---

This guide explains why and how to preview Pulsar content locally with detailed steps and various examples.

## Why preview changes locally?

It is **required** to preview your changes locally and attach the preview screenshots in your PR description. It brings many benefits, including but not limited to:

* You can test your writings. It's a way to check whether you use the correct [syntax](document-syntax.md) and debug issues. You **must ensure** docs can be compiled and published correctly.
* You can get your PR merged more quickly. Reviewers know your changes clearly and can speed up the review process.

## How to preview changes locally?

Pulsar documentation is built using Docusaurus. To preview your changes as you edit the files, you can run a local development server that serves your website and reflect the latest changes.

### Prerequisites

To verify docs are built correctly before submitting a contribution, you should set up your local environment to build and display the docs locally.

* Node >= 16.14
* Yarn >= 1.5
* Although you can use Linux, macOS, or Windows to build locally the Pulsar documentation, macOS is the preferred build environment as it offers the most complete support for documentation building.

### Preview documentation changes

Follow these steps to preview documentation changes on the **master** branch.

1. Change to the working directory:

    ```bash
    cd pulsar/site2/website
    ```

2. Run the following command to preview changes:

    ```bash
    # Preview changes on latest stable version
    sh start.sh

    # Preview changes on a specific version version
    sh start.sh 2.10.x 

    # Preview changes on multiple versions
    sh start.sh 2.10.x 2.9.x ...
    ```
    
  By default, a browser window will open at http://localhost:3000 to show the changes.

  :::tip
  
  If you want to preview changes on `master`, change the URL to `http://localhost:3000/docs/next`.

  :::

  ![alt_text](assets/website-preview.png)

### Preview Java API document changes

Follow these steps to preview Java API document changes on the **master** branch.

1. Change to the working directory:

    ```bash
    cd pulsar/site2/tools
    ```

2. Run the following command to generate the `.html` files:

    ```bash
    sh javadoc-gen.sh
    ```

3. Open the target `.html` file to preview the updates.
    
    Supposed you change JavaDoc for `ConsumerBuilder.java`:

    ```bash
    cd generated-site/api/client/{version}/org/apache/pulsar/client/api/
    open ConsumerBuilder.html
    ```

### Preview website changes

Pulsar website changes refer to all the changes made to the Pulsar website, including but not limited to the following pages:

* [Release Notes page](pathname:///release-notes/)
* [Ecosystem page](pathname:///ecosystem)
* [Case studies page](pathname:///case-studies)
* ...

Follow these steps to preview the website changes.

1. Change to the working directory:

    ```bash
    cd pulsar-site/site2/website-next
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

### Stop preview

Switch to your command-line interface and press **Control+C**.
