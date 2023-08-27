import * as React from "react";

import Layout from "@theme/Layout";
import { getVersion, getApiVersion } from "../../utils/index.js";

import s from './RestApi.module.css';

function parseVersion(pathName) {
  let swagger = "swagger";
  if (pathName.indexOf("functions") > -1) {
    swagger = "swaggerfunctions";
  } else if (pathName.indexOf("source") > -1) {
    swagger = "swaggersource";
  } else if (pathName.indexOf("sink") > -1) {
    swagger = "swaggersink";
  } else if (pathName.indexOf("packages") > -1) {
    swagger = "swaggerpackages";
  } else if (pathName.indexOf("transactions") > -1) {
    swagger = "swaggertransactions";
  } else if (pathName.indexOf("lookup") > -1) {
    swagger = "swaggerlookup";
  }
  let version = getVersion();
  let apiversion = getApiVersion(swagger);

  if (version !== "master") {
    var versions = version.split(".");
    var majorVersion = parseInt(versions[0]);
    var minorVersion = parseInt(versions[1]);
    if (majorVersion < 2) {
      version = "2.3.0";
    } else if (minorVersion < 3) {
      version = "2.3.0";
    }
  }

  return [version, apiversion];
}
class RestApi extends React.Component {
  componentDidMount() {
    let pathName = window.location.pathname;

    let [version, apiversion] = parseVersion(pathName);

    let params = window.location.search;
    params = params.replace("?", "");
    const paramsList = params.split("&");
    if (paramsList && paramsList.length > 0) {
      version = "master";
      apiversion = "";
      for (let i in paramsList) {
        let param = paramsList[i].split("=");
        if (param[0] === "version") {
          version = param[1];
        }
        if (param[0] === "apiversion") {
          apiversion = param[1];
        }
      }
    }

    const wrapper = document.querySelector(".container");
    const redoc = document.createElement("redoc");

    if (pathName.indexOf("admin-rest-api") >= 0) {
      redoc.setAttribute(
        "spec-url",
        "/swagger/" + version + "/" + apiversion + "/swagger.json"
      );
    } else if (pathName.indexOf("functions-rest-api") >= 0) {
      redoc.setAttribute(
        "spec-url",
        "/swagger/" + version + "/" + apiversion + "/swaggerfunctions.json"
      );
    } else if (pathName.indexOf("source-rest-api") >= 0) {
      redoc.setAttribute(
        "spec-url",
        "/swagger/" + version + "/" + apiversion + "/swaggersource.json"
      );
    } else if (pathName.indexOf("sink-rest-api") >= 0) {
      redoc.setAttribute(
        "spec-url",
        "/swagger/" + version + "/" + apiversion + "/swaggersink.json"
      );
    } else if (pathName.indexOf("packages-rest-api") >= 0) {
      redoc.setAttribute(
        "spec-url",
        "/swagger/" + version + "/" + apiversion + "/swaggerpackages.json"
      );
    } else if (pathName.indexOf("transactions-rest-api") >= 0) {
      redoc.setAttribute(
        "spec-url",
        "/swagger/" + version + "/" + apiversion + "/swaggertransactions.json"
      );
    } else if (pathName.indexOf("lookup-rest-api") >= 0) {
      redoc.setAttribute(
        "spec-url",
        "/swagger/" + version + "/" + apiversion + "/swaggerlookup.json"
      );
    }
    redoc.setAttribute("lazy-rendering", "true");
    const redocLink = document.createElement("script");
    redocLink.setAttribute(
      "src",
      "https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js"
    );
    const script = document.querySelector(".container script");
    wrapper.insertBefore(redoc, script);
    wrapper.insertBefore(redocLink, script);
  }

  render() {
    return (
      <Layout>
        <div className={s.container}>
          <div className="my-12 container"></div>
        </div>
      </Layout>
    );
  }
}

export default RestApi;
