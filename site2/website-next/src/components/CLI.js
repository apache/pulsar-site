const React = require("react");
import Layout from "@theme/Layout";
const versionList = require("../../versions.json");
import { getVersion } from "../utils/index.js";

function parseVersion() {}

class CLI extends React.Component {
  componentDidMount() {
    let version = getVersion();

    let params = window.location.search;
    let latestVersion = versionList[0];
    let clientModule = this.props.module || "pulsar-admin";
    params = params.replace("?", "");
    const paramsList = params.split("&");

    if (paramsList && paramsList.length > 0) {
      for (let i in paramsList) {
        let param = paramsList[i].split("=");
        if (param[0] === "version") {
          version = param[1];
        }
      }
    }

    if (version === "master") {
      let latestVersionSplit = latestVersion.split(".");
      version =
        parseInt(latestVersionSplit[0]) +
        "." +
        (parseInt(latestVersionSplit[1]) + 1) +
        ".0";
    }

    let versions = version.split(".");
    let majorVersion = parseInt(versions[0]);
    let minorVersion = parseInt(versions[1]);
    let minMinorVersion = 5;
    let referenceLink = "/pulsar-admin";
    if (clientModule === "pulsar-client") {
      minMinorVersion = 8;
      referenceLink = "/reference-cli-tools/#pulsar-client";
    } else if (clientModule === "pulsar-perf") {
      minMinorVersion = 8;
      referenceLink = "/reference-cli-tools/#pulsar-perf";
    } else if (clientModule === "pulsar") {
      minMinorVersion = 8;
      referenceLink = "/reference-cli-tools/#pulsar";
    }
    if (
      (majorVersion > 1 && minorVersion <= minMinorVersion) ||
      majorVersion === 1
    ) {
      if (version === latestVersion) {
        window.location.href = "/docs" + referenceLink;
      } else {
        window.location.href = "/docs/" + version + referenceLink;
      }
    } else {
      version = parseInt(versions[0]) + "." + parseInt(versions[1]) + ".0";
      window.location.href =
        "/tools/" + clientModule + "/" + version + "-SNAPSHOT";
    }
  }

  render() {
    return (
      <Layout>
        <div className="tailwind">
          <div className="my-12 container"></div>
        </div>
      </Layout>
    );
  }
}

export default CLI;
