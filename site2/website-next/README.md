# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Installation Dependencies

```console
yarn install
```

## Local Debug

```console
yarn start
```

## Local Preview

```
./preview.sh 2.9.1 2.9.0 #or more versions, just split by space
```

> Different from the old site, running yarn start only builds the docs of the latest version for your local preview. This change is specifically to reduce the build time. 
> 
> To build and preview the historical versions of docs in the new site, for example, 2.9.1 and 2.9.0, run the ./preview.sh 2.9.1 2.9.0 command under the pulsar-site/site2/website-next directory.
> 
> Note: 
> 
> Use space to separate version numbers, and append version numbers in the command if you want to preview more versions of docs locally.