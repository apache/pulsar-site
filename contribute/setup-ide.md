---
id: setup-ide
title: Setting up an IDE
---

These instructions apply to the Pulsar `master` branch, which uses a Gradle build. Apache Pulsar is using [lombok](https://projectlombok.org/), so you have to ensure your IDE setup with required plugins.

:::note Windows

Pulsar does not officially support Windows. For developing Pulsar on Windows, using [WSL2 (Windows Subsystem for Linux)](https://learn.microsoft.com/en-us/windows/wsl/install) is strongly recommended — use the most recent WSL2 version; legacy WSL (WSL 1) is not supported. IntelliJ IDEA supports [developing in a WSL2 environment](https://www.jetbrains.com/help/idea/how-to-use-wsl-development-environment-in-product.html), and VS Code supports WSL2 via the [WSL extension](https://code.visualstudio.com/docs/remote/wsl).

:::

## IntelliJ IDEA

### Open the project

Open the Pulsar source directory in IntelliJ IDEA (**File** → **Open** and select the cloned `pulsar` directory). IntelliJ detects the Gradle build from `settings.gradle.kts` and imports the project automatically.

### Configure the JDK

Building the `master` branch requires JDK 21 or 25 (see ["Setting up JDKs using SDKMAN"](setup-buildtools.md)).

1. Set the project JDK: Click **File** → **Project Structure** → **Project Settings** → **Project** and select a Java 21 JDK. From the JDK version drop-down list you can also choose **Download JDK...** and select version **21** and vendor **Amazon Corretto**.
2. Set the Gradle JVM: Click **Settings** → **Build, Execution, Deployment** → **Build Tools** → **Gradle** and set **Gradle JVM** to **Project SDK**.

### Build and run delegation to Gradle

Keep the default setting **Build and run using: Gradle** and **Run tests using: Gradle** (**Settings** → **Build, Execution, Deployment** → **Build Tools** → **Gradle**). With Gradle delegation, annotation processing (Lombok) and code generation (protobuf / lightproto) are handled by the Gradle build, so no separate annotation-processing configuration is needed.

Ensure the Lombok plugin is enabled in IntelliJ (it is bundled with recent IntelliJ IDEA versions).

### Configure code style

1. Open Code Style Settings dialog box by going to **Settings** → **Editor** → **Code Style**.
2. Click on the :gear: symbol → **Import scheme** → **IntelliJ IDEA code style XML**
3. Pick the file `${pulsar_dir}/src/idea-code-style.xml`
4. On the dialog box that opens, click **OK**.
5. Ensure the scheme you just created is selected in **Scheme** dropdown then click **OK**.

### Configure Checkstyle

1. Install the Checkstyle-IDEA plugin.
2. Open Checkstyle Settings. Click **Settings** → **Tools** → **Checkstyle**.
3. Set **Checkstyle version** to the version used by the build (defined as `checkstyle` in [`gradle/libs.versions.toml`](https://github.com/apache/pulsar/blob/master/gradle/libs.versions.toml)), or the nearest version available in the plugin.
4. Set **Scan scope** to **Only Java sources (including tests)**.
5. Click **+** button in the **Configuration** section to open a dialog to choose the checkstyle config file.
   1. Enter a **Description**. For example, Pulsar.
   2. Select **Use a local checkstyle file**.
   3. Set **File** to **buildtools/src/main/resources/pulsar/checkstyle.xml**.
   4. Select **Store relative to project location**.
   5. Click **Next**
   6. For suppressions, set the absolute path of **buildtools/src/main/resources/pulsar/suppressions.xml** file. In the shell you can find it out with `echo $PWD/buildtools/src/main/resources/pulsar/suppressions.xml` command.
   7. Click **Next** → **Finish**.
6. Activate the configuration you just added by toggling the corresponding box.
7. Click **OK**.

You can scan individual files by activating CheckStyle UI in the left side bar. The icon is a pencil.

![Checkstyle UI in IntelliJ](/assets/intellij-checkstyle.png)

## Visual Studio Code (VS Code)

Before starting, make sure you have installed the [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) in VS Code.

On Windows, use WSL2 with VS Code's [WSL extension](https://code.visualstudio.com/docs/remote/wsl), which runs the development environment inside WSL2 while the VS Code UI runs on Windows.

It is recommended to use [SDKMAN](https://sdkman.io/installation) to manage Java versions. The separate guide [how to setup build tools](setup-buildtools.md) explains how to install Java 21 using SDKMAN.

Once you have installed the Java versions using SDKMAN, you can add (or modify) the following settings to your VS Code User level `settings.json` file. Please check [VS Code documentation](https://code.visualstudio.com/docs/getstarted/settings) for more details. The simplest way to open the settings file is to run the `Preferences: Open Settings (JSON)` command from the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).

```json
{
    "java.jdt.ls.vmargs": "-Xmx6g -XX:+UseZGC -XX:+ZGenerational -Dsun.zip.disableMemoryMapping=true",
    "java.jdt.ls.java.home": "~/.sdkman/candidates/java/21",
    "java.configuration.runtimes": [
        {
            "name": "JavaSE-21",
            "path": "~/.sdkman/candidates/java/21",
            "default": true
        }
    ],
    "java.autobuild.enabled": false,
    "java.debug.settings.onBuildFailureProceed": true,
    "java.compile.nullAnalysis.mode": "disabled",
    "java.configuration.updateBuildConfiguration": "interactive"
}
```

The `java.autobuild.enabled` setting is set to `false` since building the Pulsar project in VS Code takes very long time.

The `java.debug.settings.onBuildFailureProceed` is set to `true` so that tests can be run even when there are individual build failures.

For troubleshooting, please check [Language support for Java extension documentation](https://github.com/redhat-developer/vscode-java/wiki/Troubleshooting). Adding `"java.transport": "stdio"` to the settings can help display errors in the error log if the problem is related to the language server.

## Eclipse

Follow [these instructions](https://howtodoinjava.com/automation/lombok-eclipse-installation-examples/) to configure your Eclipse setup.
